import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'profile', component: UserProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
