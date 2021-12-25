import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Organization, OrganizationService } from '../organization/services/organization.service';
import * as orgActions from '../organization/store/organization.actions';
import * as fromApp from '../store/index';
import { InviteUserComponent } from './invite-user/invite-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public selectedOrg$ : Observable <Organization>;
  public users: User[];
  public loggedInUser$: Observable<User>;
  public userEmail : string = '';
  public loggedInUser : User;
  public selectedOrg : Organization;
  private subscriptions : Subscription [] = [];

  constructor(private sore$ : Store<fromApp.AppState>,
              private orgService : OrganizationService,
              private matDialog : MatDialog) { }


  ngOnInit(): void {
    this.selectedOrg$ = this.sore$.select('organization').pipe(map( state => state.organization));
    this.loggedInUser$ = this.sore$.select('auth').pipe(map( state => state.user));
    this.subscriptions[2] = this.selectedOrg$.pipe(
    map(o => o.members.length === 0 ? [''] : o.members ),
    switchMap((organization) => 
    this.orgService.getOrganizationMembers(organization)))
    .subscribe(users => {
      console.log(users);
      this.users = users;
    })
    this.subscriptions[0] = this.loggedInUser$.subscribe(user => this.loggedInUser = user);
    this.subscriptions[1] = this.selectedOrg$.subscribe(org => this.selectedOrg = org);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  public onClick(event : KeyboardEvent) {
    if(event.key === 'Enter') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '25rem'
      dialogConfig.height = '18rem'
      dialogConfig.data = { inviteUserEmail : this.userEmail, orgName : this.selectedOrg.name }
      this.matDialog.open(InviteUserComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.userEmail = "");
    }
  }

  public removeUser(userUid) {
    if(this.hasRight(this.loggedInUser.uid)) {
      this.orgService.removeMember(userUid, this.selectedOrg.uid);
      this.sore$.dispatch(new orgActions.RemoveOrgMember(userUid));
    } else {
      alert("Dont have right to remove profile \n Only group owner and editors can remove profiles ")
    }
  }

  private hasRight (uid : string) {
    return (this.selectedOrg.editorsUid.includes(uid) 
    || this.selectedOrg.ownerUid === uid)
  }
  

}
