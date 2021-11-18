import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
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
  @Output() onGoalSelect = new EventEmitter();

  constructor(private goalExtensionService: GoalExtensionService) { }

  ngOnInit(): void {
  }

  public markCompleted(profile : User, goalId: number) {
    this.goalExtensionService.markCompleted(profile, goalId);
  }

  public undoCompleted(profile : User, goalId: number){
    this.goalExtensionService.undoCompleted(profile, goalId)
  }

  public onSelectGoal(goalId: number) {
    this.onGoalSelect.emit(goalId)
  }

}