package pl.hudman.cashflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.hudman.cashflow.model.Operation;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Integer> {

    List<Operation> findOperationByUserIdAndTimeStampGreaterThanEqualAndTimeStampLessThanEqual(int userId, Timestamp timeStamp, Timestamp timeStamp2);
}
