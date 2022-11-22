package youmanage.surge.sh.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import youmanage.surge.sh.model.EmployeeModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {

  List<EmployeeModel> findEmployeesByManagerId(Long id, Pageable pageable);
}
