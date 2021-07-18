package ba.todolist.Repository;

import ba.todolist.Models.ToDoList;
import ba.todolist.Models.ToDoListTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoListTaskRepository extends JpaRepository<ToDoListTask,Long> {

    /**
     * General Test
     * @param taskName search parameter
     * @return task by Name
     */
    Optional<ToDoListTask> findByTaskName(String taskName);


    /**
     * All
     * @param id ToDoListId
     * @return get All ToDoListTasks by ToDoListId and get count of Tasks
     */
    List<ToDoListTask> findAllByToDoListId (Long id);
    Integer countByToDoListId (Long id);


    /**
     * All Daily and Weekly
     * @param id ToDoListId
     * @param start Time when today or the week began
     * @param end Time when today or the week ends
     * @return get All daily and weekly ToDoListTasks by ToDoListId and UserId and get count of Tasks
     */
    List<ToDoListTask> findByEndAtIsBetweenAndToDoList_User_Id(Instant start, Instant end, Long id);
    Integer countByEndAtIsBetweenAndToDoList_User_Id(Instant start, Instant end, Long id);

    /**
     * All Missed
     * @param currentDay Local current Time
     * @param id ToDoListId
     * @return get All missed ToDoListTasks by ToDoListId and UserId and get count of Tasks
     */
    List<ToDoListTask> findAllByEndAtIsBeforeAndToDoList_User_Id(Instant currentDay, Long id);
    Integer countByEndAtIsBeforeAndToDoList_User_Id(Instant currentDay, Long id);

    /**
     * All Important
     * @param id ToDoListId
     * @return get All important ToDoListTasks by ToDoListId and UserId and get count of Tasks
     */
    List<ToDoListTask> findAllByImportantIsTrueAndToDoList_User_Id(Long id);
    Integer countByImportantIsTrueAndToDoList_User_Id(Long id);

}
