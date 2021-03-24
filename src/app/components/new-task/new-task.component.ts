import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../model/task.model';
import { AuthenticationService } from '../../services/authenticationService';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  public mode = 0;
  public task: Task;
  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.mode = 1;
    }
  }
  onSaveTask(data: Task) {
    this.authService.saveTask(data)
    .subscribe(resp => {
      this.task = resp;
      this.mode = 2;
    }, err => {
      this.mode = 0;
    });
  }
  onTasks() {
    this.router.navigateByUrl('/tasks');
  }
}
