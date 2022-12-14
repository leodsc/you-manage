package youmanage.surge.sh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import youmanage.surge.sh.exceptions.EmployeeAlreadyExistsException;
import youmanage.surge.sh.model.EmployeeModel;
import youmanage.surge.sh.service.EmployeeService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/employee")
@CrossOrigin("*")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @PostMapping
  public ResponseEntity<EmployeeModel> create(@RequestBody EmployeeModel employee) {
    try {
      return ResponseEntity.ok(employeeService.create(employee));
    } catch (EmployeeAlreadyExistsException exception) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, exception.getMessage());
    }
  }

  @DeleteMapping
  public ResponseEntity<Void> delete(@RequestBody List<EmployeeModel> employees) {
    try {
      employeeService.delete(employees);
      return ResponseEntity.noContent().build();
    } catch (Exception exc) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exc.getMessage());
    }
  }
}
