package pl.hudman.cashflow.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.hudman.cashflow.filter.AppAuthenticationFilter;
import pl.hudman.cashflow.filter.AppAuthorizationFilter;

import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public SecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AppAuthenticationFilter appAuthenticationFilter = new AppAuthenticationFilter(authenticationManagerBean());
        appAuthenticationFilter.setFilterProcessesUrl("/api/login");
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/api/login/**", "/api/refreshtoken/**").permitAll();
        http.authorizeRequests().antMatchers(GET, "/budget/operations/**").authenticated();
        http.authorizeRequests().antMatchers(POST, "/budget/operations/add/**").authenticated();
        http.authorizeRequests().antMatchers(PUT, "/budget/operations/update/**").authenticated();
        http.authorizeRequests().antMatchers(DELETE, "/budget/operations/delete/**").authenticated();
        http.authorizeRequests().antMatchers(GET, "/api/user/**").authenticated();
        http.authorizeRequests().antMatchers(POST, "/api/user/add/**").authenticated();
        http.authorizeRequests().antMatchers(PUT, "/api/user/update/**").authenticated();
        http.authorizeRequests().antMatchers(DELETE, "/api/user/delete/**").authenticated();
        http.authorizeRequests().anyRequest().permitAll();
        http.addFilter(appAuthenticationFilter);
        http.addFilterBefore(new AppAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
