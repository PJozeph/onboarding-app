import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../task.modal';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task : TaskModel;

  constructor() { }

  ngOnInit(): void {
  }

}
