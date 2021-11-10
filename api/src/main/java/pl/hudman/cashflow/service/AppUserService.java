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
import pl.hudman.cashflow.dto.AppUserDto;
import pl.hudman.cashflow.exception.IncorrectModel;
import pl.hudman.cashflow.exception.NotFound;
import pl.hudman.cashflow.model.AppUser;
import pl.hudman.cashflow.model.Operation;
import pl.hudman.cashflow.repository.AppUserRepository;
import pl.hudman.cashflow.utility.Mapper;
import pl.hudman.cashflow.utility.Validation;

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

    public void addUser(AppUserDto appUserDto) {
        if (appUserDto != null) {
            AppUser newUser = Mapper.convertToUser(appUserDto);
            this.appUserRepository.save(newUser);
        }
    }

    public void updateUser(AppUserDto appUserDto, int id) throws NotFound {
        if (appUserDto != null) {
            Optional<AppUser> user = this.appUserRepository.findById(id);

            if (user.isEmpty()) {
                throw new NotFound("Not found user by id " + id);
            }

            user.get().setEmail(appUserDto.getEmail());
            user.get().setPassword(appUserDto.getPassword());
            user.get().setCompanyName(appUserDto.getCompanyName());
            user.get().setPhoneNumber(appUserDto.getPhoneNumber());
            this.appUserRepository.save(user.get());
            return;
        }
    }

    public AppUser getUserByUserName(String userName) throws NotFound {
        Optional<AppUser> appUser = this.appUserRepository.findByCompanyName(userName);
        if (appUser.isPresent()) {
            return appUser.get();
        }
        throw new NotFound("Not found by name " + userName);
    }

    public void deleteUser(int id) {
        this.appUserRepository.deleteById(id);
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
