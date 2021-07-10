package ba.todolist.ControllerTest;

import ba.todolist.AbstractTests;
import ba.todolist.Models.ToDoList;
import ba.todolist.Models.ToDoListDTO;
import ba.todolist.Repository.ToDoRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import javax.transaction.Transactional;
import java.time.Instant;

import static junit.framework.TestCase.assertEquals;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

public class ToDoControllerMockTests extends AbstractTests {

    @Autowired
    private ToDoRepository toDoRepository;


    @Override
    @Before
    public void setUp() {
        super.setUp();
        createMockToDoList();
    }

    @After
    public void cleanUp() {
        deleteMockToDoList();
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void getToDoLists() throws Exception {
        String uri = "/api/todo/all/1";
        ResultActions result = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));

        int status = result.andReturn().getResponse().getStatus();
        assertEquals(200, status);

    }

    @Test
    public void getAllNewLists() throws Exception {
        String uri = "/api/todo/all/new/1";
        ResultActions result = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));

        int status = result.andReturn().getResponse().getStatus();
        assertEquals(200, status);
    }

    @Test
    @WithMockUser(username = "test")
    @Transactional
    public void createToDoList() throws Exception {
        String uri = "/api/todo/create";
        ToDoListDTO toDoListDTO = new ToDoListDTO("SportTest", "sports_soccer_test");

        String inputJson = super.mapToJson(toDoListDTO);
        mvc.perform(post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("name", is("SportTest")))
                .andExpect(jsonPath("iconName", is("sports_soccer_test")));
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    @Transactional
    public void updateToDoList() throws Exception {
        String uri = "/api/todo/save/";
        ToDoListDTO newToDoList = new ToDoListDTO("SportUpdate", "sports_soccer");
        newToDoList.setId(toDoRepository.findByName("Sport").get().getId());
        String inputJson = super.mapToJson(newToDoList);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(inputJson))
                .andExpect(jsonPath("name",is("SportUpdate")))
                .andExpect(jsonPath("iconName", is("sports_soccer")))
                .andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);

    }
    @Test
    @WithMockUser(username = "test", authorities = "ROLE_ADMIN")
    @Transactional
    public void deleteToDoList() throws Exception {
        String uri = "/api/todo/delete/" + toDoRepository.findByName("Sport").get().getId();
        ResultActions mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri));
        int status = mvcResult.andReturn().getResponse().getStatus();
        assertEquals(202, status);
        String content = mvcResult.andReturn().getResponse().getContentAsString();
        mvcResult.andDo(MockMvcResultHandlers.print());
    }

    @WithMockUser(username = "test")
    public void createMockToDoList(){
        ToDoList toDoList = new ToDoList("Sport", "soccer");
        toDoList.setCreatedAt(Instant.now());
        toDoRepository.save(toDoList);
    }

    @WithMockUser(username = "test")
    public void deleteMockToDoList() {
        if (toDoRepository.findByName("Sport").isPresent()){
            toDoRepository.deleteById(toDoRepository.findByName("Sport").get().getId());
        }else if (toDoRepository.findByName("SportUpdate").isPresent()){
            toDoRepository.deleteById(toDoRepository.findByName("SportUpdate").get().getId());
        }else if (toDoRepository.findByName("SportTest").isPresent()){
            toDoRepository.deleteById(toDoRepository.findByName("SportTest").get().getId());
        }
    }

}
