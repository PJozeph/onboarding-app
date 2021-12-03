import { Component, Input, OnInit } from '@angular/core';
import { Extension } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() extension : Extension;
  @Input() showIcon : boolean = true;
  @Input() isTaskManager : boolean = false;
  @Input() active : boolean = false;

  constructor() { }

  ngOnInit(): void {}


}
