import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() public onCancelEvent = new EventEmitter();
  @Output() public onAddEvent = new EventEmitter<string>();
  @Input() addActionName : String;
  @Input() isInputActive : boolean;
  public goalName : string = "";
  public isEmpty : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public onCancel() {
    this.goalName = "";
    this.isInputActive = false;
    this.onCancelEvent.emit();
  }

  public isInputEmpty() {
    this.isEmpty = this.goalName.length >= 1;
  }

  public onAdd(input : string) {
    this.goalName = "";
    this.isInputActive = false;
    this.onAddEvent.emit(input);
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }

}
