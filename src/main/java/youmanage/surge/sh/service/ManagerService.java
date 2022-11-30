package youmanage.surge.sh.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;
import youmanage.surge.sh.dto.ManagerDto;
import youmanage.surge.sh.exceptions.ManagerAlreadyExistsException;
import youmanage.surge.sh.model.ManagerModel;
import youmanage.surge.sh.repository.ManagerRepository;
import youmanage.surge.sh.security.UserDetailsImpl;
import youmanage.surge.sh.security.UserDetailsServiceImpl;

import java.util.Base64;

@Service
public class ManagerService {

  @Autowired
  private UserDetailsImpl userDetailsImpl;

  @Autowired
  private ManagerRepository managerRepository;

  private Logger logger = LogManager.getLogger("Manager Service");

  @Autowired
  private UserDetailsServiceImpl userDetailsServiceImpl;

  @Autowired
  private PasswordEncoder passwordEncoder;
  public ManagerDto signup(ManagerModel manager) throws ManagerAlreadyExistsException {
    var managerExists = managerRepository.findByEmail(manager.getEmail()).isPresent();

    if (managerExists) {
      throw new ManagerAlreadyExistsException();
    }

    String encodedPassword = passwordEncoder.encode(manager.getPassword());
    manager.setPassword((encodedPassword));
    managerRepository.save(manager);
    return new ManagerDto(manager);
  }

  public ManagerDto login(String email, String password) throws Exception {
    var userDb = managerRepository.findByEmail(email);
    if (userDb.isPresent()) {
      userDetailsImpl.setManager(userDb.get());
      boolean isPasswordRight = passwordEncoder.matches(password, userDb.get().getPassword());
      if (isPasswordRight) {
        var user = userDetailsServiceImpl.loadUserByUsername(email);

        String token = String.format("%s:%s", email, password);
        String tokenBase64 = Base64.getEncoder().encodeToString(token.getBytes());
        var managerDto = new ManagerDto(userDb.get());
        managerDto.setToken(String.format("Basic %s", tokenBase64));
        logger.info(String.format("User %s logged in!", user.getUsername()));
        return managerDto;
      }
    }
    throw new UsernameNotFoundException("Not found.");
  }
}
