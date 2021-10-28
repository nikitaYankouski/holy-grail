package pl.hudman.cashflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.exception.IncorrectParameters;
import pl.hudman.cashflow.service.OperationService;

import java.util.List;

@RestController
public class OperationController {

    @Autowired
    private OperationService operationService;

    @GetMapping("budget")
    public @ResponseBody List<OperationDto> getOperations(
            @RequestParam String fromDate, @RequestParam String toDate) {
        try {
            return this.operationService.getOperations(fromDate, toDate);
        } catch (IncorrectParameters ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }
}
