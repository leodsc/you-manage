package youmanage.surge.sh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import youmanage.surge.sh.model.EmployeeModel;
import youmanage.surge.sh.repository.EmployeeRepository;

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
    return employeeRepository.findEmployeesByManagerId(id, page);
  }
}
