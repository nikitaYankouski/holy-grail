package pl.hudman.cashflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.hudman.cashflow.exception.NotFound;
import pl.hudman.cashflow.model.AppUser;
import pl.hudman.cashflow.repository.AppUserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    private final PasswordEncoder passwordEncoder;

    public AppUserService(PasswordEncoder passwordEncoder, AppUserRepository appUserRepository) {
        this.passwordEncoder = passwordEncoder;
        this.appUserRepository = appUserRepository;
    }

    public void saveUser(AppUser user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        appUserRepository.save(user);
    }

    public AppUser getUserById(int id) throws NotFound {
        Optional<AppUser> user = this.appUserRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        throw new NotFound("Not found user by id " + id);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<AppUser> appUser = this.appUserRepository.findByCompanyName(userName);

        appUser.orElseThrow(() -> new UsernameNotFoundException("Not found user by name " + userName));
        AppUser loadUser = appUser.get();
        List<GrantedAuthority> authorities = new ArrayList<>();

        return new User(loadUser.getCompanyName(), passwordEncoder.encode(loadUser.getPassword()), authorities);
    }

}
