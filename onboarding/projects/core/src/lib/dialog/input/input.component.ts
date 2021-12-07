import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnDestroy {

  @Output() public onCancelEvent = new EventEmitter();

  @Input() inputType: string;
  @Input() addActionName: string = "default";
  @Input() isInputActive: boolean ;
  @Input() titlePlaceholder : string = "default";
  @Input() descPlaceholder : string = "default";

  public goalName: string = "";
  public goalDescription: string = ""
  public isEmpty: boolean;

  constructor() { }

  
  ngOnDestroy(): void {
    this.goalName = "";
    this.goalDescription = "";
  }

  ngOnInit(): void {
  }

  public onComplete() {
    this.isInputActive = !this.isInputActive;
  }

  public onCancel() {
    this.isInputActive = !this.isInputActive;
  }

  public isInputEmpty() {
    this.isEmpty = this.goalName.length >= 1;
  }

  public onAddGoalSelect() {
    this.isInputActive = true;
  }


}
