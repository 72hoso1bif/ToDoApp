package ba.todolist.Models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTObyAdmin {

  private String username;

  private String email;

  private String[] roles;
}
