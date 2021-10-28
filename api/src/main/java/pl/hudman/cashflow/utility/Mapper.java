package pl.hudman.cashflow.utility;

import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.model.Operation;

public class Mapper {

    public static OperationDto convertToOperationDto(Operation operation) {
        return new OperationDto(
                operation.getId(),
                operation.getUser().getId(),
                operation.getDescription(),
                operation.getTimeStamp().toString(),
                operation.isCome()
        );
    }
}
