package youmanage.surge.sh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import youmanage.surge.sh.model.ManagerModel;

import java.util.Optional;

@Repository
public interface ManagerRepository extends JpaRepository<ManagerModel, Long> {

  Optional<ManagerModel> findByEmail(String email);
}
