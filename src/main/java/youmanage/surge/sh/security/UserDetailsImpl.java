package youmanage.surge.sh.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import youmanage.surge.sh.model.ManagerModel;

import java.util.Collection;

@Setter
@Getter
@Service
public class UserDetailsImpl implements UserDetails {

  private ManagerModel manager;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return manager.getPassword();
  }

  @Override
  public String getUsername() {
    return manager.getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return false;
  }

  @Override
  public boolean isAccountNonLocked() {
    return false;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return false;
  }

  @Override
  public boolean isEnabled() {
    return false;
  }
}
