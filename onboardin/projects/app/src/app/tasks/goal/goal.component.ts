import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Subscription } from 'rxjs';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import * as fromApp from '../../store/index';
import { GoalExtensionService } from './goalextension.service';
import { GoalInput } from './input/input.component';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';
@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  @Input() user : User;
  public isInputActive: boolean = false
  public goalExtension : GoalExtension ;
  public selectedGoal : Goal;
  private subscription : Subscription;
  public maxHeight : number;

  constructor(private goalExtensionService: GoalExtensionService,
              private dialogService : MatDialog) { }

  ngOnInit(): void {
    this.maxHeight = window.innerHeight - 350;
    this.subscription = this.goalExtensionService.getExtension().subscribe(result => {
      this.goalExtension = <GoalExtension>result
    });
    this.goalExtensionService.setProfile(this.user);
    if(this.goalExtension.goals) {
        this.selectedGoal = this.goalExtension.goals[0];
    }
  }
  
  public onSelectGoal(goalId: number) {
    this.selectedGoal = this.goalExtension.goals.find( goal => goal.id === goalId);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '40rem';
    dialogConfig.width = '40rem';
    dialogConfig.data =  { 'selectedGoal' : this.selectedGoal, 'selectedUser' : this.user }
    this.dialogService.open(SelectedGoalComponent, dialogConfig)
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

  public markCompleted(profile : User, goalId: number) {
    this.goalExtensionService.markCompleted(profile, goalId);
  }

  public undoCompleted(profile : User, goalId: number){
    this.goalExtensionService.undoCompleted(profile, goalId)
  }

  public onInputCancel() {
    this.isInputActive = false;
  }

  public onInputAdd(goal: GoalInput){
    this.goalExtensionService.addGoal(this.user, goal.goalName, goal.goalDescription)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
