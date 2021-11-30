import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { switchMap } from 'rxjs/operators';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import * as formApp from './../../store/index';
import { GoalExtensionService } from './goalextension.service';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';

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
  public maxHeight : number;
  public goalsLoading : boolean = true;
  
  constructor(private goalExtensionService: GoalExtensionService,
              private dialogService : MatDialog,
              private store$ : Store<formApp.AppState>) { }

  ngOnInit(): void {
    this.maxHeight = window.innerHeight - 350;
    this.store$.select('selectedUser').subscribe(user => {
      window.localStorage.setItem('selectedUser', JSON.stringify(user.user))
      this.selectedUser = user.user
    })
    
    this.store$.select('selectedUser').pipe(
      switchMap((selectedEmployee) => 
        this.goalExtensionService.getGoals(selectedEmployee.user.uid))
    ).pipe().subscribe(goals => {
      this.userGoals = goals;
      this.goalsLoading = false;
    })
  }
  
  public onSelectGoal(goalId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '40rem';
    dialogConfig.width = '40rem';
    dialogConfig.data =  { 'selectedGoalId' : goalId, 'selectedUserId' : this.selectedUser.uid }
    this.dialogService.open(SelectedGoalComponent, dialogConfig);
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

  public onInputCancel() {
    this.isInputActive = false;
  }

  public onInputAdd(goal: Goal){
    this.goalExtensionService.addGoal(this.selectedUser.uid, goal)
  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('selectedUser')
  }

}
