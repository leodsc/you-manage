package youmanage.surge.sh.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import youmanage.surge.sh.dto.ManagerDto;
import youmanage.surge.sh.repository.ManagerRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserDetailsImpl userDetailsImpl;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return User.builder().username(username).password(userDetailsImpl.getPassword()).roles("ADMIN").build();
  }
}
