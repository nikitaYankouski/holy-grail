package pl.hudman.cashflow.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.hudman.cashflow.model.Operation;

@Repository
public interface OperationRepository extends CrudRepository<Operation, Integer> {
}
