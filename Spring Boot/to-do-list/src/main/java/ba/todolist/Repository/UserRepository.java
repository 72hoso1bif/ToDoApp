package ba.todolist.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ba.todolist.Models.User;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    Optional<User> findByUsername(String username);
    User findOneById(Long id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
