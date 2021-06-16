import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {first, tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {UserDataSource} from '../UserDataSource';
import {UserService} from '../../services/UserService';
import {AlertService} from "../../services/alert.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  users = null;
  displayedColumns: string[] = ['Email', 'Username', 'Role', 'actions'];
  dataSource: UserDataSource;
  isDeleting = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private userService: UserService, private alertService: AlertService, private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('Users');
    this.dataSource = new UserDataSource(this.userService);
    this.dataSource.loadUsers();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.dataSource.loadUsers())
      )
      .subscribe();
  }

  deleteUser(id: string) {
    this.isDeleting = true;
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success("User Erfolgreich gelöscht", {autoClose: true});
        this.dataSource.loadUsers();
      }, error => {
        this.alertService.error(error, {autoClose: true});
        });
    this.isDeleting = false;
  }
}

