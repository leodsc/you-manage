package youmanage.surge.sh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import youmanage.surge.sh.model.EmployeeModel;
import youmanage.surge.sh.repository.EmployeeRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {

  private final int MAX_EMPLOYEES_PER_REQUEST = 50;

  @Autowired
  private EmployeeRepository employeeRepository;

  public List<EmployeeModel> nextEmployees(Long id, Map<String, String> extras) {
    int pageCount = Integer.parseInt(extras.get("page"));
    int size = Integer.parseInt(extras.get("size"));

    var sort = Sort.by(extras.get("by"));
    if (extras.get("order").equals("DESC")) {
      sort.descending();
    } else {
      sort.ascending();
    }

    Pageable page = PageRequest.of(pageCount, size, sort);
    var employees = employeeRepository.findEmployeesByManagerId(id, page);
    System.out.println(employees.size());
    return employees;
  }

  public List<EmployeeModel> create(EmployeeModel employee) throws Exception {
    var employeeDb = employeeRepository.findByEmail(employee.getEmail());
    if (employeeDb.isPresent()) {
      throw new Exception("Employee already exists!");
    }

    employeeRepository.save(employee);
    Long managerId = employee.getManager().getId();
    Map<String, String> extras = new HashMap<String, String>();
    extras.put("page", "1");
    extras.put("size", "10");
    extras.put("order", "ASC");
    return nextEmployees(managerId, extras);
  }

  public Long totalEmployees(Long id) {
    return employeeRepository.countByManagerId(id);
  }
}
