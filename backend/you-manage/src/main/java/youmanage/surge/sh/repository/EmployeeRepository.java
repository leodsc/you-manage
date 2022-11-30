package youmanage.surge.sh.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.support.EntityManagerBeanDefinitionRegistrarPostProcessor;
import org.springframework.stereotype.Repository;
import youmanage.surge.sh.model.EmployeeModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeModel, Long> {

  @Query(value = "SELECT * FROM employees WHERE manager_id = ?1", nativeQuery = true)
  List<EmployeeModel> findByManagerId(Long id, Pageable pageable);
  Optional<EmployeeModel> findByEmail(String email);
  Long countByManagerId(Long id);

  List<EmployeeModel> findByManagerId(Long id);
}
