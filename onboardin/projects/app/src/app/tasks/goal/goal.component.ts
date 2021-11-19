import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Subscription } from 'rxjs';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import { GoalExtensionService } from './goalextension.service';
import * as fromApp from '../../store/index';
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
  private isLoggedIn : boolean = false;

  constructor(private goalExtensionService: GoalExtensionService,
              private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.store.select('auth').subscribe((state => {
    //   if(state.user) {
    //       this.isLoggedIn = true;
    //     } 
    // }))
    this.maxHeight = window.innerHeight - 370;
    this.subscription = this.goalExtensionService.getExtension().subscribe(result => {
      this.goalExtension = <GoalExtension>result
    });
    this.goalExtensionService.setProfile(this.user);
    if(this.goalExtension.goal) {
        this.selectedGoal = this.goalExtension.goal[0];
    }
  }
  
  public onSelectGoal(goalId: number) {
    this.selectedGoal = this.goalExtension.goal.find( goal => goal.id === goalId);
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

  public onInputAdd(goalTitle: string){
    this.goalExtensionService.addGoal(this.user, goalTitle)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
