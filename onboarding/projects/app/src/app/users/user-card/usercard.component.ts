import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import * as selectedUserActions from '../../../../../app/src/app/extension/goal/store/goal.actions';
import * as fromApp from "../../../../../app/src/app/store/index";

@Component({
  selector: 'app-user-card',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(private router : Router, 
              private store : Store<fromApp.AppState>) { }

  @Input() user : User;
  @Input() showEdit : boolean = true;
  @Output() onUserRemove = new EventEmitter();


  ngOnInit(): void {
  }
  
  public onSelect(uid : string){
    this.router.navigate(['user/' + uid + '/goals'])
    this.store.dispatch( new selectedUserActions.SelectUser(this.user))
  }

  public removeUser(userUid: string) {
    this.onUserRemove.emit(userUid);
  }

}
