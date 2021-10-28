package pl.hudman.cashflow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.exception.IncorrectParameters;
import pl.hudman.cashflow.model.Operation;
import pl.hudman.cashflow.repository.OperationRepository;
import pl.hudman.cashflow.utility.Mapper;
import pl.hudman.cashflow.utility.Validation;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OperationService {

    @Autowired
    private OperationRepository operationRepository;

    public List<OperationDto> getOperations(String fromDate, String toDate) throws IncorrectParameters {
        if (Validation.checkDateFormat(fromDate) && Validation.checkDateFormat(toDate)) {
            List<Operation> operationList = (List<Operation>) this.operationRepository.findAll();
            return operationList.stream().map(Mapper::convertToOperationDto).collect(Collectors.toList());
        }
        throw new IncorrectParameters("Not valid date");
    }
}
