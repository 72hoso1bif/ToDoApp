package ba.todolist.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ToDoListTaskDTO {

    private Long id;

    private String taskName;

    @JsonProperty(value = "status")
    private TaskStatus status;

    @JsonProperty(value = "important")
    private boolean important;

    private Long endAt;

    private Long toDoListId;

    public ToDoListTaskDTO(String taskName, TaskStatus status, boolean important, Long endAt, Long toDoListId) {
        this.taskName = taskName;
        this.status = status;
        this.important = important;
        this.endAt = endAt;
        this.toDoListId = toDoListId;
    }
}
