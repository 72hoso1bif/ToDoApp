import {Component, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {User} from './models';
import {AuthService} from './services/AuthService';
import {OpenModalService} from './services/openModalService';
import {ActivatedRoute, Router} from "@angular/router";
import {ToDoList} from "./models/todolist";
import {ToDoListService} from "./services/ToDoListService";
import {AlertService} from "./services/alert.service";
import {ToDoTaskService} from "./services/ToDoTaskService";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor() {
  }


  ngOnInit() {

  }

}
