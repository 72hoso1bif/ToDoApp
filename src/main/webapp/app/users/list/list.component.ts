import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {first, tap} from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {UserDataSource} from '../UserDataSource';
import {UserService} from '../../services/UserService';
import {AlertService} from "../../services/alert.service";
import {Title} from "@angular/platform-browser";
import {OpenModalService} from "../../services/openModalService";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  users = null;
  displayedColumns: string[] = ['Email', 'Username', 'Role', 'action'];
  dataSource: UserDataSource;
  isDeleting = false;
  hasErrors = false;
  index: number;

  @ViewChildren('email') email: QueryList<ElementRef>;
  @ViewChildren('roles') roles: QueryList<ElementRef>;
  roleElements: any;
  emailElements: any;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private userService: UserService, private alertService: AlertService, private titleService: Title, private openModalService: OpenModalService) {

  }

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
    this.roles.changes.subscribe(()=>{
      this.roleElements = this.roles.map(role => {
        return role.nativeElement;
      });
    });
    this.email.changes.subscribe(()=>{
      this.emailElements = this.email.map(email => {
        return email.nativeElement;
      });
    });
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

  startEdit(row, index) {
    row.editMode = true;
  }

  confirmEditCreate(row, index) {
    row.editMode = false;

    let currentRoleValue: string = this.roleElements[index].children[0].children[0].value;
    let currentEmailValue: string = this.emailElements[index].children[0].value;

    let rolesElement: any[] = this.dataSource.getValue().filter(user => user.id === row.id)[0].roles;
    let rolesStringElements = this.convertRoleToStrings(rolesElement);

    if(!rolesStringElements.includes(currentRoleValue)){
      if(currentRoleValue.includes(',')){
        if(currentRoleValue.split(',')[1] === 'ROLE_USER' || currentRoleValue.split(',')[1] === 'ROLE_MOD' || currentRoleValue.split(',')[1] === 'ROLE_ADMIN'){
          rolesStringElements.push(currentRoleValue.split(',')[1]);
          this.hasErrors = false;
        } else {
          this.hasErrors = true;
          this.index = index;
          this.alertService.error('There is no such Role ' + '\|' + currentRoleValue.split(',')[1] + '\|' + '\n available roles are ROLE_MOD, ROLE_ADMIN, ROLE_USER');
        }
      }else {
        this.hasErrors = true;
        this.index = index;
        this.alertService.error('No comma was found. New entry should look like \'ROLE_USER,ROLE_MOD\'', { keepAfterRouteChange: true , autoClose: true});
      }
    } else {

      this.hasErrors = false;
    }

    let user = this.dataSource.getValue().filter(user => user.id === row.id)[0];
    if(user.email === currentEmailValue && this.compareRoles(rolesStringElements, rolesElement) && !this.hasErrors) {
      this.alertService.info('Nothing was changed', { keepAfterRouteChange: true , autoClose: true});
    } else  {
      if(!this.hasErrors){
        let newUser = {
          email: currentEmailValue,
          username: row.username,
          roles: rolesStringElements
        }
        this.updateUser(row.id,newUser);
      }
    }
  }


  convertRoleToStrings(rolesElement: any[]): string[] {
    let rolesStringElements = [];
    rolesElement.forEach(role => {
      rolesStringElements.push(role.name);
    });
    return rolesStringElements;
  }

  updateUser(rowId, newUser){
    this.userService.updateByAdmin(rowId, newUser).subscribe(
      res =>{
        this.alertService.success('Update successful', { keepAfterRouteChange: true , autoClose: true});
        this.dataSource.loadUsers();
      },
      error => {
        this.alertService.error(error, {autoClose: true});
      });
  }

  compareRoles(rolesStringElements: string[], rolesElement): boolean{
    let equal = false;
    rolesStringElements.forEach(role => {
      rolesElement.forEach(roleInUser =>{
        equal = roleInUser.name === role;
      });
    });
    return equal;
  }

  cancelOrDelete(row, i) {
    if (row.editMode) {
      row.editMode = false;
      this.dataSource.loadUsers();
    }
    else {
      this.deleteUser(row.id)
    }
  }

  deleteRoleAndUpdateUser(name, row) {
    let roleElements: any[] = this.dataSource.getValue().filter(user => user.id === row.id)[0].roles;
    roleElements = roleElements.filter(role => role.name !== name);
    let roleStringElements = this.convertRoleToStrings(roleElements);
    let newUser = {
      email: row.email,
      username: row.username,
      roles: roleStringElements
    }
    this.updateUser(row.id, newUser);
  }

  openRegisterDialog() {
    this.openModalService.openRegisterDialog(true);
    this.dataSource.loadUsers();
  }
}

