import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TasksComponent } from './components/tasks/tasks.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'new-task', component: NewTaskComponent},
  {path: 'register', component: RegistrationComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
