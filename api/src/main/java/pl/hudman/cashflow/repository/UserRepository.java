package pl.hudman.cashflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.hudman.cashflow.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
