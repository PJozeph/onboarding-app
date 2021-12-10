import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Organization, OrganizationService } from '../organization/services/organization.service';

import * as fromApp from '../store/index';
import { InviteUserComponent } from './invite-user/invite-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public selectedOrg$ : Observable <Organization>;
  public userEmail : string = 'bob@gmail.com';


  constructor(private userService: UserService,
              private sore$ : Store<fromApp.AppState>,
              private orgService : OrganizationService,
              private matDialog : MatDialog) { }

  loggedInUser: Observable<User>;
  users$: Observable <User[]>;

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.selectedOrg$ = this.sore$.select('organization').pipe(map( state => state.organization));
    this.loggedInUser = this.sore$.select('auth').pipe(map( state => state.user));
    this.users$ = this.selectedOrg$.pipe(switchMap((organization) => this.orgService.getOrganizationMembers(organization.members)));

    this.selectedOrg$.subscribe(res => console.log(res.members))

  }

  ngOnDestroy(): void {
  }

  public onClick(event : KeyboardEvent) {
    if(event.key === 'Enter') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '25rem'
      dialogConfig.height = '15rem'
      dialogConfig.data = { inviteUserEmail : this.userEmail }
      this.matDialog.open(InviteUserComponent, dialogConfig);
    }
  }
  

}
