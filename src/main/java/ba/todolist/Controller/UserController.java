package ba.todolist.Controller;


import ba.todolist.Models.*;
import ba.todolist.Payload.response.JwtResponse;
import ba.todolist.Repository.ImageRepository;
import ba.todolist.Repository.RoleRepository;
import ba.todolist.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MOD')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<JwtResponse> getUserById(@PathVariable Long id , @RequestHeader("Authorization") String token) {
        User user = userRepository.findById(id).get();

        List<String> roles = user.getRoles().stream()
          .map(item -> item.getName().name())
          .collect(Collectors.toList());

        String jwt = token.split(" ")[1];

        return ResponseEntity.ok(new JwtResponse(jwt,
          user.getId(),
          user.getUsername(),
          user.getEmail(),
          user.getImage(),
          roles));
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MOD')")
    public User updateUserByAdmin(@PathVariable Long id, @RequestBody UserDTObyAdmin newUser) {
      User user = userRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
      user.setUsername(newUser.getUsername());
      user.setEmail(newUser.getEmail());
      Set<Role> roles = new HashSet<>();
      for (String role: newUser.getRoles()) {
        ERole eRole = ERole.valueOf(role);
        Role tempRole = roleRepository.findByName(eRole).get();
        roles.add(tempRole);
      }
      user.setRoles(roles);

      return userRepository.save(user);
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
            if (updatedUser.getImageId() == null){
              user.setImage(null);
            } else {
              user.setImage(imageRepository.findById(updatedUser.getImageId()).get());
            }
            return userRepository.save(user);
        });
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('MOD')")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}
