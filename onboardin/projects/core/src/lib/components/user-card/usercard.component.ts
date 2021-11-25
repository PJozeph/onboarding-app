import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SharedService } from '../../services/shared.service';
import { User } from './user.modal';
import * as fromApp from "../../../../../app/src/app/store/index"
import * as selectedUserActions from '../../../../../app/src/app/extension/goal/store/goal.actions'

@Component({
  selector: 'lib-user-card',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UserCardComponent implements OnInit {

  constructor(private router : Router, 
              private sharedService : SharedService,
              private store : Store<fromApp.AppState>) { }

  @Input() user : User;
  @Input() showEdit : boolean = true;

  ngOnInit(): void {
  }
  
  public onSelect(uid : string){
    this.router.navigate(['user/' + uid + '/goals'])
    this.store.dispatch( new selectedUserActions.SelectUser(this.user))
  }

}
