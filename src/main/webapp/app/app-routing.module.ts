import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './helper/auth.gard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [AuthGuard] },
  { path: 'toDoList', loadChildren: './toDolist/toDoList.module#ToDoListModule', canActivate: [AuthGuard] },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
