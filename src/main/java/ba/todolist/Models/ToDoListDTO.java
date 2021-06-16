package ba.todolist.Models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ToDoListDTO {

    private Long id;

    private String name;

    private Long userId;

    private String iconName;

    public ToDoListDTO(String name, String iconName) {
        this.name = name;
        this.iconName = iconName;
    }
}
