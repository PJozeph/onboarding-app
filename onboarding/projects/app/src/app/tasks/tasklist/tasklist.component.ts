import { Component, OnInit } from '@angular/core';
import { Extension, TaskService } from '../task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TaskListComponent implements OnInit {

  extensions : Extension [] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.extensions = this.taskService.getTasks();
  }

}
