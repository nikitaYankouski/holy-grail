package pl.hudman.cashflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.hudman.cashflow.model.User;
import pl.hudman.cashflow.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // not dto for local request for OperationService
    public User getUserById(int id) {
        return this.userRepository.findById(id).get();
    }
}
