import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'projects/core/src/public-api';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskCardComponent } from './task/task.component';
import { TaskListComponent } from './tasklist/tasklist.component';
import { GoalComponent } from './goal/goal.component';
import { InputComponent } from './goal/input/input.component';
import { FormsModule } from '@angular/forms';
import { SelectedGoalComponent } from './goal/selected-goal/selected-goal.component';
import { GoalItemComponent } from './goal/goal-item/goal-item.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskCardComponent,
    TaskManagerComponent,
    GoalComponent,
    InputComponent,
    SelectedGoalComponent,
    GoalItemComponent,
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