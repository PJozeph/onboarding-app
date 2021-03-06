import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'projects/core/src/public-api';
import { UsersModule } from '../users/users.module';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskCardComponent } from './task/task.component';
import { TaskListComponent } from './tasklist/tasklist.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent,
    TaskManagerComponent],
  imports: [
    TaskRoutingModule,
    CommonModule, 
    CoreModule,
    FormsModule,
    UsersModule,
  ]
})
export class TaskModule { }