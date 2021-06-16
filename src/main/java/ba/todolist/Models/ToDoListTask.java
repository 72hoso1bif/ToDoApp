package ba.todolist.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.util.Objects;



@Entity
@Table(name = "todo_list_task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ToDoListTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    private String taskName;

    @NotNull
    private TaskStatus status;

    @NotNull
    @JsonProperty(value = "important")
    private boolean important;

    @NotNull
    private Instant createdAt;

    @NotNull
    private Instant endAt;

    @JsonIgnore
    @ManyToOne
    private ToDoList toDoList;

    public ToDoListTask(String taskName, TaskStatus status, boolean important, Instant createdAt, Instant endAt) {
        this.taskName = taskName;
        this.status = status;
        this.important = important;
        this.createdAt = createdAt;
        this.endAt = endAt;
    }

    @Override
    public String toString() {
        return "ToDoListTask{" +
                "id=" + id +
                ", taskName='" + taskName + '\'' +
                ", status=" + status +
                ", important=" + important +
                ", createdAt=" + createdAt +
                ", endAt=" + endAt +
                ", toDoList=" + toDoList +
                '}';
    }
}
