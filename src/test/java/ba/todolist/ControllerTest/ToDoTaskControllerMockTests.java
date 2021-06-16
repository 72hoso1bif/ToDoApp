package ba.todolist.ControllerTest;

import ba.todolist.AbstractTest;
import ba.todolist.Models.*;
import ba.todolist.Repository.ToDoListTaskRepository;
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

public class ToDoTaskControllerMockTests extends AbstractTest {

    @Autowired
    private ToDoListTaskRepository toDoTaskRepository;

    @Autowired
    private ToDoRepository toDoRepository;


    @Override
    @Before
    public void setUp() {
        super.setUp();
        createMockToDoListTask();
    }

    @After
    public void cleanUp() {
        deleteMockToDoListTask();
    }


    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void getToDoListTasks() throws Exception {
        String uri = "/api/todotask/all/"+toDoRepository.findByName("Sport").get().getId();
        ResultActions result = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE));

        int status = result.andReturn().getResponse().getStatus();
        assertEquals(200, status);

    }

    @Test
    @WithMockUser(username = "test")
    @Transactional
    public void createToDoListTask() throws Exception {
        String uri = "/api/todotask/create";
        ToDoListTaskDTO newToDoListTask = new ToDoListTaskDTO("test kaufen test", TaskStatus.TASK_STATUS_TODO, false, Instant.now().getEpochSecond(), toDoRepository.findByName("Sport").get().getId());

        String inputJson = super.mapToJson(newToDoListTask);
        mvc.perform(post(uri).contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson))
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(jsonPath("taskName", is("test kaufen test")))
                .andExpect(jsonPath("important", is(false)));
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    @Transactional
    public void updateToDoListTask() throws Exception {
        String uri = "/api/todotask/save/";
        ToDoListTaskDTO newToDoListTask = new ToDoListTaskDTO("test kaufen update", TaskStatus.TASK_STATUS_TODO, true, Instant.now().getEpochSecond(), toDoRepository.findByName("Sport").get().getId());
        newToDoListTask.setId(toDoTaskRepository.findByTaskName("test kaufen").get().getId());
        String inputJson = super.mapToJson(newToDoListTask);
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(inputJson))
                .andExpect(jsonPath("taskName",is("test kaufen update")))
                .andExpect(jsonPath("important", is(true)))
                .andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);

    }
    @Test
    @WithMockUser(username = "test", authorities = "ROLE_ADMIN")
    @Transactional
    public void deleteToDoList() throws Exception {
        String uri = "/api/todotask/delete/" + toDoTaskRepository.findByTaskName("test kaufen").get().getId();
        ResultActions mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri));
        int status = mvcResult.andReturn().getResponse().getStatus();
        assertEquals(202, status);
        String content = mvcResult.andReturn().getResponse().getContentAsString();
        mvcResult.andDo(MockMvcResultHandlers.print());
    }

    @WithMockUser(username = "test")
    public void createMockToDoListTask(){
        ToDoListTask toDoListTask = new ToDoListTask("test kaufen", TaskStatus.TASK_STATUS_TODO, false, Instant.now(), Instant.now());
        toDoTaskRepository.save(toDoListTask);
        ToDoList toDoList = new ToDoList("Sport", "soccer");
        toDoList.setCreatedAt(Instant.now());
        toDoRepository.save(toDoList);
    }

    @WithMockUser(username = "test")
    public void deleteMockToDoListTask() {
        if (toDoRepository.findByName("Sport").isPresent()) {
            toDoRepository.deleteById(toDoRepository.findByName("Sport").get().getId());
        }
        if (toDoTaskRepository.findByTaskName("test kaufen").isPresent()){
            toDoTaskRepository.deleteById(toDoTaskRepository.findByTaskName("test kaufen").get().getId());
        }else if (toDoTaskRepository.findByTaskName("test kaufen test").isPresent()){
            toDoTaskRepository.deleteById(toDoTaskRepository.findByTaskName("test kaufen test").get().getId());
        }else if (toDoTaskRepository.findByTaskName("test kaufen update").isPresent()){
            toDoTaskRepository.deleteById(toDoTaskRepository.findByTaskName("test kaufen update").get().getId());
        }
    }

}
