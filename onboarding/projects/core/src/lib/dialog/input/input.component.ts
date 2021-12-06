import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Goal } from 'projects/app/src/app/extension/modal/extension.goal.modal';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() public onCancelEvent = new EventEmitter();
  @Output() public onAddGoal = new EventEmitter<Goal>();
  @Input() addActionName: String;
  @Input() isInputActive: boolean;
  public goalName: string = "";
  public goalDescription: string = ""
  public isEmpty: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public onCancel() {
    this.goalName = "";
    this.goalDescription = "";
    this.isInputActive = false;
    this.onCancelEvent.emit();
  }

  public isInputEmpty() {
    this.isEmpty = this.goalName.length >= 1;
  }

  public onAdd() {
    this.onAddGoal.emit(
      {
        name: this.goalName,
        description: this.goalDescription,
        completed: false,
        comment: []
      });
    this.goalName = "";
    this.goalDescription = "";
    this.isInputActive = false;
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }


}
