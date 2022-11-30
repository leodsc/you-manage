package youmanage.surge.sh.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.List;

@Entity(name="managers")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ManagerModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Size(min=2, max=32)
  private String name;

  @Email
  private String email;

  private String password;

  @OneToMany(mappedBy = "manager")
  @JsonIgnoreProperties("manager")
  @ToString.Exclude
  private List<EmployeeModel> employees;
}
