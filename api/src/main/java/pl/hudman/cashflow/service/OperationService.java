package pl.hudman.cashflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.exception.IncorrectModel;
import pl.hudman.cashflow.exception.IncorrectParameters;
import pl.hudman.cashflow.exception.NotFound;
import pl.hudman.cashflow.model.Operation;
import pl.hudman.cashflow.model.AppUser;
import pl.hudman.cashflow.repository.OperationRepository;
import pl.hudman.cashflow.utility.Mapper;
import pl.hudman.cashflow.utility.Validation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OperationService {

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private AppUserService appUserService;

    public List<OperationDto> getOperations(String fromDate, String toDate, String username) throws IncorrectParameters, NotFound {
        if (Validation.checkDateFormat(fromDate) && Validation.checkDateFormat(toDate)) {
            int userId = this.appUserService.getUserByUserName(username).getId();
            List<Operation> operationList =
                    this.operationRepository.findOperationByUserIdAndTimeStampGreaterThanEqualAndTimeStampLessThanEqual
                            (userId, Mapper.convertToTimestamp(fromDate), Mapper.convertToTimestamp(toDate));

            return operationList.stream().map(Mapper::convertToOperationDto).collect(Collectors.toList());
        }
        throw new IncorrectParameters("Not valid date");
    }

    public OperationDto addOperation(OperationDto operationDto, String username) throws IncorrectModel, NotFound {
        if (operationDto != null && Validation.checkDateFormat(operationDto.getTimeStamp())) {
            int userId = this.appUserService.getUserByUserName(username).getId();
            Operation newOperation = Mapper.convertToOperation(operationDto, userId);
            return Mapper.convertToOperationDto(this.operationRepository.save(newOperation));
        }
        throw new IncorrectModel("Not valid operation");
    }

    public void updateOperation(OperationDto operationDto, int id) throws IncorrectModel, NotFound {
        if (operationDto != null && Validation.checkDateFormat(operationDto.getTimeStamp())) {
            Optional<Operation> operation = this.operationRepository.findById(id);

            if (operation.isEmpty()) {
                throw new NotFound("Not found model by id " + id);
            }

            operation.get().setDescription(operationDto.getDescription());
            operation.get().setCome(operationDto.isInCome());
            operation.get().setTimeStamp(Mapper.convertToTimestamp(operationDto.getTimeStamp()));
            operation.get().setAmountOfMoney(operationDto.getAmountOfMoney());
            operationRepository.save(operation.get());
            return;
        }
        throw new IncorrectModel("Not valid operation");
    }

    public void deleteOperation(int id) {
        this.operationRepository.deleteById(id);
    }
}
