package youmanage.surge.sh.controller;

import org.apache.coyote.Response;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import youmanage.surge.sh.dto.ManagerDto;
import youmanage.surge.sh.exceptions.ManagerAlreadyExistsException;
import youmanage.surge.sh.model.EmployeeModel;
import youmanage.surge.sh.model.ManagerModel;
import youmanage.surge.sh.repository.EmployeeRepository;
import youmanage.surge.sh.repository.ManagerRepository;
import youmanage.surge.sh.service.EmployeeService;
import youmanage.surge.sh.service.ManagerService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/manager")
public class ManagerController {

  private final Logger logger = LogManager.getLogger("Manager Controller");
  @Autowired
  private ManagerService managerService;

  @Autowired
  private EmployeeService employeeService;

  @Autowired
  private EmployeeRepository employeeRepository;

  @PostMapping("/signup")
  private ResponseEntity<ManagerDto> signup(@RequestBody ManagerModel manager) {
    try {
      var newManager = ResponseEntity.ok(managerService.signup(manager));
      logger.info(String.format("Created new manager: %s (%s)", manager.getName(), manager.getEmail()));
      return newManager;
    } catch (ManagerAlreadyExistsException exc) {
      logger.info(String.format("Manager %s failed because email %s already exists.", manager.getName(), manager.getEmail()));
      throw new ResponseStatusException(HttpStatus.CONFLICT, exc.getMessage());
    }
  }

  @PostMapping("/login")
  private ResponseEntity<ManagerDto> login(@RequestBody Map<String, String> auth) throws Exception {
    System.out.println(auth);
    return ResponseEntity.ok(managerService.login(auth.get("email"), auth.get("password")));
  }

  @GetMapping("/{id}")
  public ResponseEntity<List<EmployeeModel>> getAllEmployees(@PathVariable("id") Long id) {
    return ResponseEntity.ok(employeeRepository.findByManagerId(id));
  }

  @GetMapping("/{id}/employees")
  public ResponseEntity<List<EmployeeModel>> getNextEmployees(@PathVariable("id") Long id, @RequestParam Map<String, String> filters) {
    System.out.println(filters);
    return ResponseEntity.ok(employeeService.nextEmployees(id, filters));
  }

  @GetMapping("/{id}/employees/total")
  public ResponseEntity<Long> totalEmployees(@PathVariable("id") Long id) {
    return ResponseEntity.ok(employeeService.totalEmployees(id));
  }
}
