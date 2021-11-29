import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable, Subscription } from 'rxjs';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import * as formApp from './../../store/index';
import { GoalExtensionService } from './goalextension.service';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';
import { first } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  public selectedUser : User;
  public isInputActive: boolean = false
  public goalExtension : GoalExtension;
  public userGoals : Goal [];
  public selectedGoal : Goal;
  private subscription : Subscription;
  public maxHeight : number;

  private getGoalSubscription : Subscription;

  constructor(private goalExtensionService: GoalExtensionService,
              private dialogService : MatDialog,
              private store$ : Store<formApp.AppState>) { }

  ngOnInit(): void {
    this.maxHeight = window.innerHeight - 350;
    this.store$.select('selectedUser').subscribe(user => this.selectedUser = user.user)
    this.store$.select('selectedUser').pipe(
      switchMap((selectedEmployee) => 
        this.goalExtensionService.getGoals(selectedEmployee.user.uid))
    ).pipe().subscribe( goals => {
      this.userGoals = goals;
    })

  }
  
  public onSelectGoal(goalId: string) {
    this.getGoalSubscription = this.goalExtensionService.getGoal(this.selectedUser.uid, goalId)
    .subscribe(goal => {
      console.log("open window")
      this.selectedGoal = goal
      const dialogConfig = new MatDialogConfig();
      dialogConfig.height = '40rem';
      dialogConfig.width = '40rem';
      dialogConfig.data =  { 'selectedGoal' : this.selectedGoal, 'selectedUser' : this.selectedUser }
      this.dialogService.open(SelectedGoalComponent, dialogConfig);
    });
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

  public markCompleted(profile : User, goalId: string) {
    this.goalExtensionService.markCompleted(profile, goalId);
  }

  public undoCompleted(profile : User, goalId: string){
    this.goalExtensionService.undoCompleted(profile, goalId)
  }

  public onInputCancel() {
    this.isInputActive = false;
  }

  public onInputAdd(goal: Goal){
    this.goalExtensionService.addGoal(this.selectedUser.uid, goal)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.getGoalSubscription.unsubscribe();
  }

}
