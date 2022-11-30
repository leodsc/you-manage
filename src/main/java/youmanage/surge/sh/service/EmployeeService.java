package youmanage.surge.sh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import youmanage.surge.sh.exceptions.EmployeeAlreadyExistsException;
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

    Sort sort;
    if (extras.get("order").equals("DESC") || extras.get("order").equals("Z-A")) {
      sort = Sort.by(extras.get("by")).descending();
    } else {
      sort = Sort.by(extras.get("by")).ascending();
    }

    Pageable page = PageRequest.of(pageCount, size, sort);
    var employees = employeeRepository.findByManagerId(id, page);
    System.out.println(employees.size());
    return employees;
  }

  public EmployeeModel create(EmployeeModel employee) throws EmployeeAlreadyExistsException {
    var employeeDb = employeeRepository.findByEmail(employee.getEmail());

    if (employeeDb.isPresent()) {
      throw new EmployeeAlreadyExistsException();
    }

    employeeRepository.save(employee);
    return employee;
  }

  public void delete(List<EmployeeModel> employees) {
    employees.forEach(employee -> {
      employeeRepository.delete(employee);
    });
  }

  public Long totalEmployees(Long id) {
    return employeeRepository.countByManagerId(id);
  }
}
