package pl.hudman.cashflow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.hudman.cashflow.dto.OperationDto;
import pl.hudman.cashflow.exception.IncorrectModel;
import pl.hudman.cashflow.exception.IncorrectParameters;
import pl.hudman.cashflow.exception.NotFound;
import pl.hudman.cashflow.service.OperationService;

import java.util.List;

@RestController
@RequestMapping("/budget")
public class OperationController {

    @Autowired
    private OperationService operationService;

    @GetMapping("/operations")
    public List<OperationDto> getOperations(@RequestParam String fromDate, @RequestParam String toDate) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = (String) auth.getPrincipal();
            return this.operationService.getOperations(fromDate, toDate, username);
        } catch (IncorrectParameters ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        } catch (NotFound ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @PostMapping("/operations/add")
    public ResponseEntity<String> addOperation(@RequestBody OperationDto operationDto) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = (String) auth.getPrincipal();
            this.operationService.addOperation(operationDto, username);
            return new ResponseEntity<>("Ok", HttpStatus.OK);
        } catch (IncorrectModel ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NotFound ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/operations/update/{id}")
    public ResponseEntity<String> updateOperation(@RequestBody OperationDto operationDto, @PathVariable int id) {
        try {
            this.operationService.updateOperation(operationDto, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IncorrectModel ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NotFound ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/operations/delete/{id}")
    public ResponseEntity<String> deleteOperation(@PathVariable int id) {
        this.operationService.deleteOperation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
