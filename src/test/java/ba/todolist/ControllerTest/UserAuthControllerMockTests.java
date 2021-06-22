package ba.todolist.ControllerTest;

import ba.todolist.AbstractTest;
import ba.todolist.Models.ERole;
import ba.todolist.Models.Role;
import ba.todolist.Models.User;
import ba.todolist.Payload.request.LoginRequest;
import ba.todolist.Payload.request.SignupRequest;
import ba.todolist.Payload.response.MessageResponse;
import ba.todolist.Repository.RoleRepository;
import ba.todolist.Repository.ToDoRepository;
import ba.todolist.Repository.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import static junit.framework.TestCase.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
public class UserAuthControllerMockTests extends AbstractTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    @Before
    public void setUp() {
        super.setUp();

        createMockUser();
    }

    @After
    public void cleanUp() {
        deleteMockUser();
    }


    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void getUsers() throws Exception {
        String uri = "/api/users/all/1";
        ResultActions result = mvc.perform(MockMvcRequestBuilders.get(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));

        int status = result.andReturn().getResponse().getStatus();
        assertEquals(200, status);
        String content = result.andReturn().getResponse().getContentAsString();
        User[] users = super.mapFromJson(content, User[].class);
        System.out.println(content);
        result.andDo(MockMvcResultHandlers.print());
        User user = Arrays.stream(users)
                .filter(user1 -> "test".equals(user1.getUsername()))
                .findAny()
                .orElse(null);
        assertTrue(users.length > 0);
        assertNotNull(user);
    }

    @Test
    public void registerUser() throws Exception {
        String uri = "/api/auth/signup";
        SignupRequest signupRequest = SignupRequest.builder().username("tester").email("tester@test.de").password("123456").build();
        String inputJson = super.mapToJson(signupRequest);
        MvcResult mvcResult = mvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(inputJson)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        MessageResponse content = new MessageResponse(mvcResult.getResponse().getContentAsString().split("\"")[3]);
        assertEquals(content.getMessage(), new MessageResponse("User registered successfully!").getMessage());
    }

    @Test
    public void authenticateUser() throws Exception {
        String uri = "/api/auth/signin";
        LoginRequest loginRequest = LoginRequest.builder().username("test").password("123456").build();
        String inputJson = super.mapToJson(loginRequest);
        mvc.perform(post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("username", is("test")))
                .andExpect(jsonPath("email", is("test@test.de")));
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void updateUserByAdmin() throws Exception {
        String uri = "/api/users/update/" + userRepository.findByUsername("test").get().getId();
        User newUser = new User();
        newUser.setUsername("TestUpdate");
        newUser.setEmail("test@testUpdate.de");
        newUser.setPassword("123456");
        String inputJson = super.mapToJson(newUser);
        ResultActions result = mvc.perform(MockMvcRequestBuilders.put(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(inputJson));

        int status = result.andReturn().getResponse().getStatus();
        assertEquals(200, status);
        String content = result.andReturn().getResponse().getContentAsString();
        User user = super.mapFromJson(content, User.class);
        result.andDo(MockMvcResultHandlers.print());
        assertEquals(user.getUsername(), "TestUpdate");
    }
    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void deleteUser() throws Exception {
        String uri = "/api/users/delete/" + userRepository.findByUsername("test").get().getId();
        ResultActions mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri));
        int status = mvcResult.andReturn().getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.andReturn().getResponse().getContentAsString();
        mvcResult.andDo(MockMvcResultHandlers.print());
    }

    public void createMockUser(){
        User user = new User("test","test@test.de", encoder.encode("123456"));
        Set<Role> roles = new HashSet<>();
        Role userRole = new Role(1 ,ERole.ROLE_USER);
        roles.add(userRole);
        user.setRoles(roles);
        userRepository.save(user);
    }

    public void deleteMockUser() {
        if (userRepository.findByUsername("test").isPresent()){
            userRepository.deleteById(userRepository.findByUsername("test").get().getId());
        }else if(userRepository.findByUsername("tester").isPresent()){
            userRepository.deleteById(userRepository.findByUsername("tester").get().getId());
        } else if (userRepository.findByUsername("TestUpdate").isPresent()){
            userRepository.deleteById(userRepository.findByUsername("TestUpdate").get().getId());
        }
    }

}
