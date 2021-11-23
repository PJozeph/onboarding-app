import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


export interface GoalInput {
  goalName : string;
  goalDescription : string
}

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() public onCancelEvent = new EventEmitter();
  @Output() public onAddEvent = new EventEmitter<GoalInput>();
  @Input() addActionName : String;
  @Input() isInputActive : boolean;
  public goalName : string = "";
  public goalDescription : string = ""
  public isEmpty : boolean;

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
    this.onAddEvent.emit({goalName : this.goalName, goalDescription : this.goalDescription});
    this.goalName = "";
    this.goalDescription = "";
    this.isInputActive = false;
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

}
