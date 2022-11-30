package youmanage.surge.sh.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
@ToString
@Entity(name="employees")
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name="firstName")
  @Size(min=2, max=32)
  private String firstName;

  @Column(name="lastName")
  @Size(min=2, max=32)
  private String lastName;

  @Email
  private String email;

  @NotNull
  private String cpf;

  @NotNull
  private Double wage;

  @NotNull
  private String department;

  @NotNull
  private Date birthday;

  @NotNull
  private Date hiring;

  @ManyToOne
  @JsonIgnoreProperties("employees")
  private ManagerModel manager;
}
