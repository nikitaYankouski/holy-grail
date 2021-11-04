package pl.hudman.cashflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.exception.IncorrectModel;
import pl.hudman.cashflow.exception.IncorrectParameters;
import pl.hudman.cashflow.exception.NotFound;
import pl.hudman.cashflow.service.OperationService;

import java.util.List;

@RestController("/budget")
public class OperationController {

    @Autowired
    private OperationService operationService;

    @GetMapping("/account")
    public @ResponseBody List<OperationDto> getOperations(
            @RequestParam String fromDate, @RequestParam String toDate) {
        try {
            return this.operationService.getOperations(fromDate, toDate);
        } catch (IncorrectParameters ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @PostMapping("/account")
    public ResponseEntity<String> addOperation(@RequestBody OperationDto operationDto) {
        try {
            this.operationService.addOperation(operationDto);
            return new ResponseEntity<>("Ok", HttpStatus.OK);
        } catch (IncorrectModel ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NotFound ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<String> updateOperation(@RequestBody OperationDto operationDto, @PathVariable int id) {
        try {
            this.operationService.updateOperation(operationDto, id);
            return new ResponseEntity<>("Ok", HttpStatus.OK);
        } catch (IncorrectModel ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NotFound ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/account/{id}")
    public ResponseEntity<String> deleteOperation(@PathVariable int id) {
        this.operationService.deleteOperation(id);
        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }
}
