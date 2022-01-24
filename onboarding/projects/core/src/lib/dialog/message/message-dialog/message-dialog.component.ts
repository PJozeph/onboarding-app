import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  public message = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {
    this.message =this.data['message'];
  }

}
