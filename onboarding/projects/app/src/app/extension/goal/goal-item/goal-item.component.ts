import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Goal } from '../../../extension/modal/extension.goal.modal';
import { GoalExtensionService } from '../goalextension.service';

@Component({
  selector: 'app-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.css']
})
export class GoalItemComponent implements OnInit {

  @Input() goalItem : Goal;
  @Input() user : User;
  @Input() active : boolean;
  @Output() onGoalSelect = new EventEmitter();

  constructor(private goalExtensionService: GoalExtensionService) { }

  ngOnInit(): void {
  }

  public markCompleted(profile : User, goalId: string) {
    this.goalExtensionService.markCompleted(profile, goalId);
  }

  public undoCompleted(profile : User, goalId: string){
    this.goalExtensionService.undoCompleted(profile, goalId)
  }

  public onSelectGoal(goalId: string) {
    this.onGoalSelect.emit(goalId)
  }

  public onDeleteGoal(user : User, goalId: string) {
    this.goalExtensionService.deleteGoal(user.uid, goalId);
  }

}