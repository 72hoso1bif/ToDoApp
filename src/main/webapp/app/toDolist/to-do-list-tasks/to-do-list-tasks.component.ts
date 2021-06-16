import {
  Component,
  OnInit,
} from '@angular/core';
import {ToDoListTask} from "../../models/todolisttask";
import {ToDoListService} from "../../services/ToDoListService";
import {AuthService} from "../../services/AuthService";
import {ToDoTaskService} from "../../services/ToDoTaskService";
import {filter} from "rxjs/operators";
import {AlertService} from "../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {OpenModalService} from "../../services/openModalService";
import {ToDoSharedDataService} from "../../services/toDoSharedDataService";
import {ToDoListDTO} from "../../models/todolist";
import {BehaviorSubject} from "rxjs";
import {ToDoTaskSharedDataService} from "../../services/ToDoTaskSharedDataService";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-to-do-list-tasks',
  templateUrl: './to-do-list-tasks.component.html',
  styleUrls: ['./to-do-list-tasks.component.scss']
})
export class ToDoListTasksComponent implements OnInit {


  todoListTaskSubject: BehaviorSubject<ToDoListTask[]>;
  todoListTaskInProgressSubject: BehaviorSubject<ToDoListTask[]>;
  todoListTaskDoneSubject: BehaviorSubject<ToDoListTask[]>;
  todoListTask: ToDoListTask[] = [];
  todoListTaskInProgress: ToDoListTask[] = [];
  todoListTaskDone: ToDoListTask[] = [];
  todoListTaskToDelete: ToDoListTask[] = [];
  todoListTaskCopy: ToDoListTask[] = [];
  todoListTaskInProgressCopy: ToDoListTask[] = [];
  todoListTaskDoneCopy: ToDoListTask[] = [];

  toDoListId: number;

  toDoListName: string;
  toDoListIconName: string;
  searchValue: string;
  matToolTipValueForToDoListName: string;
  newToDoListName: string;

  toDoListNameDisabled: boolean;
  inEditMode: boolean;


  constructor(
    private toDoTaskService: ToDoTaskService,
    private authService: AuthService,
    private toDoListService: ToDoListService,
    private alertService: AlertService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected titleService: Title,
    private openModalService: OpenModalService,
    private toDoSharedDataService: ToDoSharedDataService,
    private toDoTaskSharedDataService: ToDoTaskSharedDataService
  ) {
    this.todoListTaskSubject = this.toDoTaskSharedDataService.toDoTaskSubject;
    this.todoListTaskInProgressSubject = this.toDoTaskSharedDataService.toDoTaskInProgressSubject;
    this.todoListTaskDoneSubject = this.toDoTaskSharedDataService.toDoTaskDoneSubject;
    this.toDoTaskSharedDataService.toDoTaskSubject.subscribe(value => this.todoListTask = value);
    this.toDoTaskSharedDataService.toDoTaskInProgressSubject.subscribe(value => this.todoListTaskInProgress = value);
    this.toDoTaskSharedDataService.toDoTaskDoneSubject.subscribe(value => this.todoListTaskDone = value);
  }

  ngOnInit() {
    this.titleService.setTitle('ToDo List');
    this.matToolTipValueForToDoListName = 'Click to edit Me';
    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.toDoListId = params.id;
        this.toDoListName = params.name;
        this.newToDoListName = params.name;
        this.toDoListIconName = params.iconName;
        this.titleService.setTitle('ToDo List ' + this.toDoListName);
        this.toDoTaskSharedDataService.updateTasks('By Id', this.toDoListId);

      } else if (params.important) {
        this.toDoListId = null;
        this.toDoListName = 'Important';
        this.toDoListIconName = 'grade';
        this.titleService.setTitle('ToDo List ' + this.toDoListName);
        this.toDoTaskSharedDataService.updateTasks('Important', this.toDoListId);

      } else if (params.daily) {
        this.toDoListId = null;
        this.toDoListName = 'My Day';
        this.toDoListIconName = 'wb_sunny';
        this.titleService.setTitle('ToDo List ' + this.toDoListName);
        this.toDoTaskSharedDataService.updateTasks('My Day', this.toDoListId);

      } else if (params.missed) {
        this.toDoListId = null;
        this.toDoListName = 'Missed';
        this.toDoListIconName = 'call_missed';
        this.titleService.setTitle('ToDo List ' + this.toDoListName);
        this.toDoTaskSharedDataService.updateTasks('Missed', this.toDoListId);

      } else if (params.weekly) {
        this.toDoListId = null;
        this.toDoListName = 'My Week';
        this.toDoListIconName = 'event';
        this.titleService.setTitle('ToDo List ' + this.toDoListName);
        this.toDoTaskSharedDataService.updateTasks('My Week', this.toDoListId);
      }
    });
  }

  updateToDoList() {
    let newName = '';
    if (this.toDoListName !== this.newToDoListName) {
      newName = this.newToDoListName;
    } else {
      newName = this.toDoListName;
    }
    console.log(newName);
    this.matToolTipValueForToDoListName = 'Click to edit Me';
    this.toDoListNameDisabled = true;
    const updatedToDoList: ToDoListDTO = {
      id: this.toDoListId,
      name: newName,
      iconName: this.toDoListIconName
    };
    console.log(updatedToDoList);
    this.toDoListService.updateTodo(updatedToDoList).subscribe(result => {
      this.toDoSharedDataService.updateToDoList();
    });
  }

  updateTaskSharedData() {
    if (this.toDoListId === null) {
      this.toDoTaskSharedDataService.updateTasks(this.toDoListName, this.toDoListId);
    } else {
      this.toDoTaskSharedDataService.updateTasks('By Id', this.toDoListId);
    }
  }

  deleteToDoTask(taskId: string) {
    this.todoListTaskToDelete = this.todoListTaskToDelete.filter((value => taskId !== value.id));
    this.toDoTaskService.deleteTodoTask(Number(taskId)).subscribe(res => {
      this.updateTaskSharedData();
      this.toDoSharedDataService.updateToDoList();
    });
  }

  deleteToDoList() {
    console.log("auwawa");
    this.toDoListService.deleteTodo(this.toDoListId).subscribe(result => {
      this.toDoSharedDataService.updateToDoList();
      console.log("auwawa");
      this.router.navigate(['']);
    });
  }

  updateToDoListTask(task: ToDoListTask) {
    task.endAt = new Date(task.endAt).getTime();
    this.toDoTaskService.updateTodoTask(task).subscribe(res => {
      this.updateTaskSharedData();
      this.toDoSharedDataService.updateToDoList();
    });
  }


  createNewTask() {
    this.inEditMode = false;
    this.openModalService.openToDoTaskDialog(this.toDoListId, this.toDoListName, this.inEditMode, []);
    this.todoListTaskToDelete = [];
  }

  toggleImportant(toDo: ToDoListTask) {
    toDo.important = !toDo.important;
    this.updateToDoListTask(toDo);
  }

  drop(event: CdkDragDrop<ToDoListTask[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
      if (event.container.element.nativeElement.id === 'list_todo') {
        event.container.data.forEach(task => {
          task.status = 'TASK_STATUS_TODO';
          this.updateToDoListTask(task);
        });
      } else if (event.container.element.nativeElement.id === 'list_todo_in_progress') {
        event.container.data.forEach(task => {
          task.status = 'TASK_STATUS_IN_PROGRESS';
          this.updateToDoListTask(task);
        });
      } else if (event.container.element.nativeElement.id === 'list_todo_done') {
        event.container.data.forEach(task => {
          task.status = 'TASK_STATUS_DONE';
          this.updateToDoListTask(task);
        });

      } else if (event.container.element.nativeElement.id === 'list_todo_delete') {

      }
    }
  }

  filterValues(value) {
    value.toLowerCase();
    this.todoListTask = this.toDoTaskSharedDataService.toDoTaskSubject.value
      .filter((task) => task.taskName.toLowerCase().includes(value));
    this.todoListTaskInProgress = this.toDoTaskSharedDataService.toDoTaskInProgressSubject.value
      .filter((task) => task.taskName.toLowerCase().includes(value));
    this.todoListTaskDone = this.toDoTaskSharedDataService.toDoTaskDoneSubject.value
      .filter((task) => task.taskName.toLowerCase().includes(value));
  }

  onSearchChange(event: any) {
    const value = this.searchValue;
    if (event.data === null) {
      if (this.searchValue === '') {
        this.updateTaskSharedData();
      } else {
        this.filterValues(value);
      }
    } else {
      this.filterValues(value);
    }

  }

  editToDoTask(task: ToDoListTask) {
    task.editMode = task.editMode !== true;
    console.log(task.editMode);
    console.log(task);
    this.openModalService.openToDoTaskDialog(this.toDoListId, this.toDoListName,
    task.editMode, [task]);
    task.editMode = task.editMode !== true;
  }

  onToDoListNameChange(event) {
    this.newToDoListName = event.target.value;
    this.matToolTipValueForToDoListName = 'click edit Button to save new Value';
  }

  deleteToDoTaskAll() {
    this.todoListTaskToDelete.forEach(task => {
      this.deleteToDoTask(task.id);
    });
  }
}
