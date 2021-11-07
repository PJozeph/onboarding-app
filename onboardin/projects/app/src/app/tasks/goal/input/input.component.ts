import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Output() onCancelEvent = new EventEmitter();
  @Output() onAddEvent = new EventEmitter<string>();
  public enteredValue : string = "";
  public isEmpty : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public onCancel() {
    this.onCancelEvent.emit();
    this.enteredValue = "";
  }

  public isInputEmpty() {
    this.isEmpty = this.enteredValue.length >= 1;
  }

  public onAdd(input : string) {
    this.onAddEvent.emit(input);
    this.enteredValue = "";
  }

}
