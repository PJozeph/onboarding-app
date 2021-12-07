import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { InputDialogService, InputDialogSource } from '../services/input.service';

@Component({
  selector: 'lib-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit, OnDestroy {

  @Output() public onCancelEvent = new EventEmitter();
  @Output() public onCompleteEvent = new EventEmitter();

  @Input() inputType: string;
  @Input() addActionName: string;
  @Input() titlePlaceholder : string;
  @Input() descPlaceholder : string;

  public title: string = "";
  public description: string = ""
  public isEmpty: boolean;

  constructor(private inputService : InputDialogService) { }

  ngOnDestroy(): void {
    this.description = ""
    this.title = "";
  }

  ngOnInit(): void {
  }

  public onAdd() {
    const source : InputDialogSource = {type : this.inputType, title: this.title, description : this.description }
    this.inputService.addSource(source)
    this.onCompleteEvent.emit();
  }

  public onCancel() {
    this.onCancelEvent.emit();
  }

  public isInputEmpty() {
    this.isEmpty = this.title.length >= 1;
  }


}
