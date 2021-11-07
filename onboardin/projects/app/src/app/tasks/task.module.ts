import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'projects/core/src/public-api';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskCardComponent } from './task/task.component';
import { TaskListComponent } from './tasklist/tasklist.component';
import { GoalComponent } from './goal/goal.component';
import { InputComponent } from './goal/input/input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent,
    TaskManagerComponent,
    GoalComponent,
    InputComponent,
  ],
  imports: [
    CommonModule, 
    CoreModule,
    FormsModule
  ],
  exports: [
    TaskListComponent,
    TaskCardComponent,
    TaskManagerComponent,
  ]
})
export class TaskModule { }