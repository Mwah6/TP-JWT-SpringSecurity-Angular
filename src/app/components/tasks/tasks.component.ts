import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../model/task.model';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task [];
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.getTasks()
    .subscribe(data => {
      this.tasks = data;
    }, error => {
      this.authService.logout();
      this.router.navigateByUrl('/login');
    });
  }
  onNewTask() {
    this.router.navigateByUrl('/new-task');
  }

}
