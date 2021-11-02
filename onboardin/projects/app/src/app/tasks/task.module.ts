import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'projects/core/src/public-api';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskCardComponent } from './task/task.component';
import { TaskListComponent } from './tasklist/tasklist.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent,
    TaskManagerComponent,
  ],
  imports: [
    CommonModule, 
    CoreModule
  ],
  exports: [
    TaskListComponent,
    TaskCardComponent,
    TaskManagerComponent,
  ]
})
export class TaskModule { }