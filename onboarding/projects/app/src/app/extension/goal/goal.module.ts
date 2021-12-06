import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'projects/core/src/public-api';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { GoalItemComponent } from './goal-item/goal-item.component';
import { GoalRoutingModule } from './goal-routing.module';
import { GoalComponent } from './goal.component';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';
import { UserNamePipe } from './pipes/user-name.pipe';
import { UserImagePipe } from './pipes/user-image.pipe';

@NgModule({
  declarations: [
    CommentItemComponent,
    GoalComponent,
    SelectedGoalComponent,
    GoalItemComponent,
    UserNamePipe,
    UserImagePipe],
  imports: [
    GoalRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    FormsModule,
  ]
})
export class GoalModule { }
