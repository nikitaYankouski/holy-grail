package pl.hudman.cashflow.utility;

import pl.hudman.cashflow.dto.AppUserDto;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.model.AppUser;
import pl.hudman.cashflow.model.Operation;

import java.sql.Timestamp;

public class Mapper {

    public static OperationDto convertToOperationDto(Operation operation) {
        return new OperationDto(
                operation.getId(),
                operation.getUserId(),
                operation.getDescription(),
                operation.getTimeStamp().toString(),
                operation.isCome(),
                operation.getAmountOfMoney()
        );
    }

    public static Operation convertToOperation(OperationDto operationDto, int userId) {
        return new Operation(
                userId,
                operationDto.getDescription(),
                operationDto.isInCome(),
                convertToTimestamp(operationDto.getTimeStamp()),
                operationDto.getAmountOfMoney()
        );
    }

    public static AppUser convertToUser(AppUserDto userDto) {
        return new AppUser(
                userDto.getEmail(),
                userDto.getPassword(),
                userDto.getCompanyName(),
                userDto.getPhoneNumber()
        );
    }

    public static Timestamp convertToTimestamp(String stringDate) {
        if (stringDate.length() >= 10) {
            stringDate = stringDate.substring(0, 10);
        }
        stringDate = stringDate.concat(" 00:00:00");
        return Timestamp.valueOf(stringDate);
    }
}
