package youmanage.surge.sh.exceptions;

public class ManagerAlreadyExistsException extends Exception{

  @Override
  public String getMessage() {
    return "A manager with this e-mail already exists!";
  }
}
