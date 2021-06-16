package ba.todolist.Repository;

import ba.todolist.Models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoRepository extends JpaRepository<ToDoList,Long> {
    List<ToDoList> findAllByUserIdOrderByCreatedAtAsc(Long user_id);
    Optional<ToDoList> findToDoListsById(Long id);

    Optional<ToDoList> findByName(String name);

    ToDoList findOneById(Long id);

    List<ToDoList> findByUserId(Long user_id);


    List<ToDoList> findAllByCreatedAtIsBetweenAndUserId(Instant dayStart, Instant dayEnd, Long userId);

}
