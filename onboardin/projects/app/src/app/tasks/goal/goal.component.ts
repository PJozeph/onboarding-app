import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Subscription } from 'rxjs';
import { Goal, GoalExtension } from '../../extension/modal/extension.goal.modal';
import { GoalExtensionService } from './goalextension.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, OnDestroy {

  constructor(private goalExtensionService: GoalExtensionService) { }

  @Input() profile : User;
  isInputActive: boolean = false

  goalExtension : GoalExtension ;
  selectedGoal : Goal;
  private subscription : Subscription;
  public maxHeight : number;

  ngOnInit(): void {
    this.maxHeight = window.innerHeight - 370;
    this.subscription = this.goalExtensionService.getExtension().subscribe(result => {
      this.goalExtension = <GoalExtension>result
    });
    this.goalExtensionService.setProfile(this.profile);
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
    this.goalExtensionService.addGoal(this.profile, goalTitle)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
