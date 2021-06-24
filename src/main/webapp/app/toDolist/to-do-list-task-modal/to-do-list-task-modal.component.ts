import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {OpenModalService} from "../../services/openModalService";
import {AlertService} from "../../services/alert.service";
import {AuthService} from "../../services/AuthService";
import {first} from "rxjs/operators";
import {ToDoListTask} from "../../models/todolisttask";
import {ToDoTaskService} from "../../services/ToDoTaskService";
import {MatFormFieldControl} from "@angular/material/form-field";
import {ToDoSharedDataService} from "../../services/toDoSharedDataService";
import {ToDoTaskSharedDataService} from "../../services/ToDoTaskSharedDataService";

@Component({
  selector: 'app-to-do-list-task-modal',
  templateUrl: './to-do-list-task-modal.component.html',
  styleUrls: ['./to-do-list-task-modal.component.scss']
})
export class ToDoListTaskModalComponent implements OnInit {


  toDoTaskForm: FormGroup;
  inEditModeValues = [];

  submitted = false;
  loading = false;
  inEditMode = false;

  returnUrl: string;
  buttonText: string;
  toDoListName: string;
  toDoListId: number;

  constructor(
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ToDoListTaskModalComponent>,
    private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private openModalService: OpenModalService,
    private alertService: AlertService, private toDoTaskService: ToDoTaskService,
    private toDoSharedDataService: ToDoSharedDataService, private toDoTaskSharedDataService: ToDoTaskSharedDataService) {}

  ngOnInit() {

    this.toDoTaskForm = this.formBuilder.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      endAt: ['', Validators.required],
      important: [false]
    });

    if (this.inEditMode) {
      this.f.taskName.setValue(this.inEditModeValues[0].taskName);
      this.f.endAt.setValue(this.inEditModeValues[0].endAt);
      this.f.important.setValue(this.inEditModeValues[0].important);
      this.buttonText = 'save';
    } else {
      this.buttonText = 'create';
    }

    this.returnUrl = this.router.url;

  }

  get f() { return this.toDoTaskForm.controls; }

  updateTaskSharedData() {
    if (this.toDoListId === null) {
      this.toDoTaskSharedDataService.updateTasks(this.toDoListName, this.toDoListId);
    } else {
      this.toDoTaskSharedDataService.updateTasks('By Id', this.toDoListId);
    }
  }


  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.toDoTaskForm.invalid) {
      return;
    }

    const middleOfDay = new Date(this.f.endAt.value);
    middleOfDay.setHours(12);

    if (!this.inEditMode) {

      const newToDoTask: ToDoListTask = {
        taskName: this.f.taskName.value,
        endAt: middleOfDay.getTime(),
        important: this.f.important.value,
        toDoListId: this.toDoListId
      };

      this.loading = true;
      this.toDoTaskService.createTodoTask(newToDoTask)
        .subscribe(
          data => {
            this.toDoSharedDataService.updateToDoList();
            this.updateTaskSharedData();
            this.dialogRef.close();
          },
          error => {
            this.alertService.error(error, {autoClose: true});
            this.loading = false;
          });

    } else if (this.inEditMode) {


      const updatedToDoTask: ToDoListTask = {
        id: this.inEditModeValues[0].id,
        taskName: this.f.taskName.value,
        endAt: middleOfDay.getTime(),
        important: this.f.important.value,
        toDoListId: this.toDoListId,
        status: this.inEditModeValues[0].status
      };
      this.loading = true;
      this.toDoTaskService.updateTodoTask(updatedToDoTask).subscribe(
        data => {
          this.dialogRef.close();
          this.toDoSharedDataService.updateToDoList();
          this.updateTaskSharedData();
        },
        error => {
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
    }

  }

}
