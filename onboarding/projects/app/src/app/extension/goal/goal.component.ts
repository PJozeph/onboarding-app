import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { InputDialogService, InputDialogSource } from 'projects/core/src/lib/dialog/input/services/input.service';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Goal  } from '../../extension/modal/extension.goal.modal';
import * as formApp from './../../store/index';
import { GoalExtensionService } from './goalextension.service';
import { SelectedGoalComponent } from './selected-goal/selected-goal.component';

import * as goalCommentActions from '../goal/comment-item/store/goal-comment.actions';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  public selectedUser : User;
  public isInputActive: boolean = false
  public userGoals : Goal [];
  public maxHeight : number;
  public goalsLoading : boolean = true;

  private inputSubscription : Subscription;
  
  constructor(private goalExtensionService: GoalExtensionService,
              private dialogService : MatDialog,
              private store$ : Store<formApp.AppState>,
              private inputDialogService : InputDialogService) { }

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

    this.inputSubscription = this.inputDialogService.source().pipe(
      filter(source => source.type === 'GOAL'))
      .subscribe(
      (source : InputDialogSource) => {
          this.addGoal({
            name: source.title,
            description : source.description? source.description : '', 
            completed: false,
            comment : []
          })
      }
    )

  }
  
  public onSelectGoal(goalId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '45rem';
    dialogConfig.width = '45rem';
    dialogConfig.data =  { 'selectedGoalId' : goalId, 'selectedUserId' : this.selectedUser.uid }
    this.dialogService.open(SelectedGoalComponent, dialogConfig);

    this.store$.select('selectedUser')
    .pipe(map(state => state.user)).subscribe( selectedUser => {
      this.store$.
      dispatch(new goalCommentActions.RetrieveComments(
            {userId: selectedUser.uid, goalId : goalId}
          ))
    })
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

  public onInputCancel() {
    this.isInputActive = false;
  }

  public addGoal(goal: Goal){
    this.goalExtensionService.addGoal(this.selectedUser.uid, goal)
  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('selectedUser');
    this.inputSubscription.unsubscribe();
  }

}
