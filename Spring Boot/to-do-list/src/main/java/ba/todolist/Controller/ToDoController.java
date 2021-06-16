package ba.todolist.Controller;

import ba.todolist.Models.ToDoList;
import ba.todolist.Models.ToDoListDTO;
import ba.todolist.Repository.ToDoRepository;
import ba.todolist.Repository.UserRepository;
import ba.todolist.Security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.*;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/todo")
@Transactional
public class ToDoController {

    @Autowired
    private ToDoRepository toDoRepository;

    @Autowired
    private UserRepository userRepository;



    @GetMapping("/all/{userId}")
    public List<ToDoList> findAllByUserId(@PathVariable Long userId){
        return toDoRepository.findAllByUserIdOrderByCreatedAtAsc(userId);
    }

    @GetMapping("/all/new/{userId}")
    public List<ToDoList> findAllNewToDoLists(@PathVariable Long userId){
        Instant currentTime = ZonedDateTime.now(ZoneId.systemDefault()).toLocalDateTime().toInstant(ZoneOffset.UTC);
        String[] currentTimeSplit = currentTime.toString().split("T");
        String dayStart = currentTimeSplit[0] + "T00:00:00Z";
        String dayEnd = currentTimeSplit[0] + "T23:59:59Z";
        Instant dayStartInstant = Instant.parse(dayStart);
        Instant dayEndInstant = Instant.parse(dayEnd);
        return toDoRepository.findAllByCreatedAtIsBetweenAndUserId(dayStartInstant, dayEndInstant, userId);
    }

    @PostMapping("/create")
    public ToDoList saveTodoList(@RequestBody ToDoListDTO toDoListDTO) {
        ToDoList toDoList = new ToDoList();
        toDoList.setUser(userRepository.findOneById(toDoListDTO.getUserId()));
        toDoList.setName(toDoListDTO.getName());
        toDoList.setIconName(toDoListDTO.getIconName());
        toDoList.setCreatedAt(ZonedDateTime.now(ZoneId.systemDefault()).toLocalDateTime().toInstant(ZoneOffset.UTC));
        return toDoRepository.save(toDoList);
    }

    @PutMapping("/save")
    public ToDoList updateTodoList(@RequestBody ToDoListDTO toDoListDTO) {
        ToDoList currentToDo = toDoRepository.findOneById(toDoListDTO.getId());
        currentToDo.setName(toDoListDTO.getName());
        currentToDo.setIconName(toDoListDTO.getIconName());
        return toDoRepository.save(currentToDo);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteTodoList(@PathVariable Long id) {
        toDoRepository.deleteById(id);
    }
}
