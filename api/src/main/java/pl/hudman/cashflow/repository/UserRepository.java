package pl.hudman.cashflow.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.hudman.cashflow.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
