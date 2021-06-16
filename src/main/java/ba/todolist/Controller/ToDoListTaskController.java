package ba.todolist.Controller;

import ba.todolist.Models.TaskStatus;
import ba.todolist.Models.ToDoListTask;
import ba.todolist.Models.ToDoListTaskDTO;
import ba.todolist.Repository.ToDoListTaskRepository;
import ba.todolist.Repository.ToDoRepository;
import ba.todolist.Repository.UserRepository;
import ba.todolist.Security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.*;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/todotask")
@Transactional
public class ToDoListTaskController {

    @Autowired
    private ToDoListTaskRepository toDoListTaskRepository;

    @Autowired
    private ToDoRepository toDoRepository;

    @Autowired
    private UserRepository userRepository;

    public Long getCurrentUserId() {
        return userRepository.findByUsername(SecurityUtils.getCurrentUser().get()).get().getId();
    }


    @GetMapping("/all/{id}")
    public List<ToDoListTask> getAllByToDoListId(@PathVariable Long id){
        return toDoListTaskRepository.findAllByToDoListId(id);
    }

    @GetMapping("/count/{id}")
    public Integer countAllByToDoListId(@PathVariable Long id){
        return toDoListTaskRepository.countByToDoListId(id);
    }

    @GetMapping("/important/{userId}")
    public List<ToDoListTask> findAllImportantTasks(@PathVariable Long userId) {
        return toDoListTaskRepository.findAllByImportantIsTrueAndToDoList_User_Id(userId);
    }

    @GetMapping("/count/important/{userId}")
    public Integer countByImportantTasks(@PathVariable Long userId) {
        return toDoListTaskRepository.countByImportantIsTrueAndToDoList_User_Id(userId);
    }

    @GetMapping("/daily/{userId}")
    public List<ToDoListTask> getDailyTasks(@PathVariable Long userId){
        Instant currentTime = ZonedDateTime.now(ZoneId.systemDefault()).toLocalDateTime().toInstant(ZoneOffset.UTC);
        String[] currentTimeSplit = currentTime.toString().split("T");
        String dayStart = currentTimeSplit[0] + "T00:00:00Z";
        String dayEnd = currentTimeSplit[0] + "T23:59:59Z";
        Instant dayStartInstant = Instant.parse(dayStart);
        Instant dayEndInstant = Instant.parse(dayEnd);
        return toDoListTaskRepository.findByEndAtIsBetweenAndToDoList_User_Id(dayStartInstant, dayEndInstant, userId);
    }

    @GetMapping("/count/daily/{userId}")
    public Integer countByDailyTasks(@PathVariable Long userId){
        Instant currentTime = ZonedDateTime.now(ZoneId.systemDefault()).toLocalDateTime().toInstant(ZoneOffset.UTC);
        String[] currentTimeSplit = currentTime.toString().split("T");
        String dayStart = currentTimeSplit[0] + "T00:00:00Z";
        String dayEnd = currentTimeSplit[0] + "T23:59:59Z";
        Instant dayStartInstant = Instant.parse(dayStart);
        Instant dayEndInstant = Instant.parse(dayEnd);
        return toDoListTaskRepository.countByEndAtIsBetweenAndToDoList_User_Id(dayStartInstant, dayEndInstant, userId);
    }

    @GetMapping("/weekly/{userId}")
    public List<ToDoListTask> getWeeklyTasks(@PathVariable Long userId){

        ZonedDateTime monday = Instant.now().atZone(ZoneId.systemDefault());
        while (monday.getDayOfWeek() != DayOfWeek.MONDAY) {
           monday = monday.minusDays(1);
        }
        ZonedDateTime sunday = Instant.now().atZone(ZoneId.systemDefault());
        while (sunday.getDayOfWeek() != DayOfWeek.SUNDAY) {
            sunday = sunday.plusDays(1);
        }
        return toDoListTaskRepository.findByEndAtIsBetweenAndToDoList_User_Id(monday.toInstant(), sunday.toInstant(), userId);
    }

    @GetMapping("/count/weekly/{userId}")
    public Integer countByWeeklyTasks(@PathVariable Long userId){

        ZonedDateTime monday = Instant.now().atZone(ZoneId.systemDefault());
        while (monday.getDayOfWeek() != DayOfWeek.MONDAY) {
            monday = monday.minusDays(1);
        }

        ZonedDateTime sunday = Instant.now().atZone(ZoneId.systemDefault());
        while (sunday.getDayOfWeek() != DayOfWeek.SUNDAY) {
            sunday = sunday.plusDays(1);
        }
        return toDoListTaskRepository.countByEndAtIsBetweenAndToDoList_User_Id(monday.toInstant(), sunday.toInstant(), userId);
    }


    @GetMapping("/missed/{userId}")
    public List<ToDoListTask> findAllByMissedTasks(@PathVariable Long userId) {
        String[] currentTimeSplit = Instant.now().toString().split("T");
        String dayStart = currentTimeSplit[0] + "T00:00:00Z";
        Instant dayStartInstant = Instant.parse(dayStart);
        return toDoListTaskRepository.findAllByEndAtIsBeforeAndToDoList_User_Id(dayStartInstant, userId);
    }

    @GetMapping("/count/missed/{userId}")
    public Integer countByMissedTasks(@PathVariable Long userId) {
        String[] currentTimeSplit = Instant.now().toString().split("T");
        String dayStart = currentTimeSplit[0] + "T00:00:00Z";
        Instant dayStartInstant = Instant.parse(dayStart);
        return toDoListTaskRepository.countByEndAtIsBeforeAndToDoList_User_Id(dayStartInstant, userId);
    }

    @PostMapping("/create")
    public ToDoListTask createTodoListTask(@RequestBody ToDoListTaskDTO toDoListTaskDTO) {
        ToDoListTask newToDoListTask = new ToDoListTask();
        newToDoListTask.setTaskName(toDoListTaskDTO.getTaskName());
        newToDoListTask.setStatus(TaskStatus.TASK_STATUS_TODO);
        newToDoListTask.setImportant(toDoListTaskDTO.isImportant());
        Instant date = Instant.ofEpochMilli(toDoListTaskDTO.getEndAt());
        newToDoListTask.setCreatedAt(ZonedDateTime.now(ZoneId.systemDefault()).toLocalDateTime().toInstant(ZoneOffset.UTC));
        newToDoListTask.setEndAt(date);
        newToDoListTask.setToDoList(this.toDoRepository.findById(toDoListTaskDTO.getToDoListId()).get());

        return this.toDoListTaskRepository.save(newToDoListTask);
    }

    @PutMapping("/save")
    public ToDoListTask updateTodoListTask(@RequestBody ToDoListTaskDTO toDoListTaskDTO) {
        ToDoListTask uToDoListTask = new ToDoListTask();
        uToDoListTask.setId(toDoListTaskDTO.getId());
        uToDoListTask.setTaskName(toDoListTaskDTO.getTaskName());
        uToDoListTask.setStatus(toDoListTaskDTO.getStatus());
        uToDoListTask.setImportant(toDoListTaskDTO.isImportant());
        Instant date = Instant.ofEpochMilli(toDoListTaskDTO.getEndAt());
        uToDoListTask.setEndAt(date);
        ToDoListTask currentTask = this.toDoListTaskRepository.findById(toDoListTaskDTO.getId()).get();
        uToDoListTask.setCreatedAt(currentTask.getCreatedAt());
        uToDoListTask.setToDoList(currentTask.getToDoList());
        return this.toDoListTaskRepository.save(uToDoListTask);
    }   

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public void deleteTodoListTask(@PathVariable Long id) {
        toDoListTaskRepository.deleteById(id);
    }
}
