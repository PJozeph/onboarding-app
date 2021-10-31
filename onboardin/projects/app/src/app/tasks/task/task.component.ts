import { Component, Input, OnInit } from '@angular/core';
import { TaskCard } from '../task.modal';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task : TaskCard;

  constructor() { }

  ngOnInit(): void {
  }

}
