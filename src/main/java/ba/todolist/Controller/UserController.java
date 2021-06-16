package ba.todolist.Controller;



import ba.todolist.Models.User;
import ba.todolist.Models.UserDTO;
import ba.todolist.Repository.ImageRepository;
import ba.todolist.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public Optional<User> updateUserByAdmin(@PathVariable Long id, @RequestBody User newUser) {
      return userRepository.findById(id)
        .map(user -> {
            user.setEmail(newUser.getEmail());
            user.setUsername(newUser.getUsername());
            user.setPassword(encoder.encode(newUser.getPassword()));
            return userRepository.save(user);
        });
    }

    @PutMapping("/update")
    public Optional<User> updateUser(@RequestBody UserDTO updatedUser) {
       return userRepository.findById(updatedUser.getId())
        .map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setUsername(updatedUser.getUsername());
            if(updatedUser.getPassword() != null){
                user.setPassword(encoder.encode(updatedUser.getPassword()));
            }
            user.setImage(imageRepository.findById(updatedUser.getImageId()).get());
            return userRepository.save(user);
        });
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MODERATOR')")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
