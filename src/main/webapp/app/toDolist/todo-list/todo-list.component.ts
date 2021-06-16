import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/AuthService';
import { first } from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ToDoListService} from "../../services/ToDoListService";
import {ToDoListDTO} from "../../models/todolist";
import {AlertService} from "../../services/alert.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {OpenModalService} from "../../services/openModalService";
import {ActivatedRoute, Router} from "@angular/router";
import {ToDoSharedDataService} from "../../services/toDoSharedDataService";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TodoListComponent implements OnInit {

  toDoListForm: FormGroup;

  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<TodoListComponent>,
    private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router, private openModalService: OpenModalService,
    private alertService: AlertService, private toDoSharedDataService: ToDoSharedDataService,
    private toDoListService: ToDoListService,  private authService: AuthService) {}

  ngOnInit() {
    this.toDoListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      iconName: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  get f() { return this.toDoListForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.toDoListForm.invalid) {
      return;
    }

    const newToDoDTO: ToDoListDTO = {
          name: this.f.name.value,
          userId: Number(this.authService.userValue.id),
          iconName: this.f.iconName.value
        };

    this.loading = true;
    this.toDoListService.createTodo(newToDoDTO)
      .pipe(first())
      .subscribe(
        data => {
          this.dialogRef.close();
          this.toDoSharedDataService.updateToDoList();
        },
        error => {
          this.alertService.error(error, {autoClose: true});
          this.loading = false;
        });
  }

}

