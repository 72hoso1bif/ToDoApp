import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './helper/auth.gard';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const toDoListModule = () => import('./toDolist/toDoList.module').then(x => x.ToDoListModule);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'toDoList', loadChildren: toDoListModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
