package youmanage.surge.sh.dto;

import lombok.Getter;
import lombok.Setter;
import youmanage.surge.sh.model.ManagerModel;

@Getter
@Setter
public class ManagerDto {

  private Long id;

  private String email;

  private String name;

  private String token;

  public ManagerDto(ManagerModel manager) {
    this.id = manager.getId();
    this.email = manager.getEmail();
    this.name = manager.getName();
  }
}
