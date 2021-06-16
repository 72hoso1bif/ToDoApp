package ba.todolist.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "todo_list")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ToDoList {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 30)
    private String name;

    @JsonIgnore
    @ManyToOne
    private User user;

    @Size(max = 50)
    @NotNull
    private String iconName;

    @NotNull
    private Instant createdAt;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "toDoList")
    private Set<ToDoListTask> toDoListTasks = new HashSet<>();

    public ToDoList(String name, String iconName) {
        this.name = name;
        this.iconName = iconName;
    }

    @Override
    public String toString() {
        return "ToDoList{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", user=" + user.getId() +
                ", iconName='" + iconName + '\'' +
                ", createdAt=" + createdAt +
                ", toDoListTasks=" + toDoListTasks +
                '}';
    }
}
