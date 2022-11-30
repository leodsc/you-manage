package youmanage.surge.sh.exceptions;

public class EmployeeAlreadyExistsException extends Exception {

  @Override
  public String getMessage() {
    return "HOME.WORKER_ALREADY_EXISTS";
  }
}
