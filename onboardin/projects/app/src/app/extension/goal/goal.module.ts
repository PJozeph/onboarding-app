import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'projects/core/src/public-api';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { GoalItemComponent } from './goal-item/goal-item.component';
import { GoalRoutingModule } from './goal-routing.module';
import { GoalComponent } from './goal.component';
import { InputComponent } from './input/input.component';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';

@NgModule({
  declarations: [
    CommentItemComponent,
    GoalComponent,
    InputComponent,
    SelectedGoalComponent,
    GoalItemComponent],
  imports: [
    GoalRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    FormsModule,
  ],
  exports: [
    GoalComponent,
    InputComponent,
    SelectedGoalComponent,
    GoalItemComponent
  ]
})
export class GoalModule { }
