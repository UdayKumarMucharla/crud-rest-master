import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import {UserFormComponent} from "./user-form/user-form.component";
import {login} from '../Log/login.component';
import {logDetails} from '../LogDetails/logDetails.component';
const usersRoutes: Routes = [
  {path : 'login',component:login}, 
  { path: 'users', component: UsersComponent, pathMatch: 'full' },
  { path: 'users/new', component: UserFormComponent},
  { path: 'users/:id', component: UserFormComponent},
  {path: 'logDeatils',component:logDetails }
];

export const usersRouting = RouterModule.forChild(usersRoutes);
