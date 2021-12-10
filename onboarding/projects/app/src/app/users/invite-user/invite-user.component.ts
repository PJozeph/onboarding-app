import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationService } from '../../organization/services/organization.service';
import * as fromApp from '../../store/index';


@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {


  public inviteUser$  : Observable<User>;
  private loggedInUserUid : string;
  private selectedOrgUid  : string ;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {},
             private userService : UserService,
             private store$ : Store<fromApp.AppState>,
             private orgService  : OrganizationService) { }

  ngOnInit(): void {
    this.inviteUser$ = this.userService.getUserByEmail(this.data['inviteUserEmail'])
    .pipe(map(users => users[0]));

    this.store$.select('auth').pipe(map(state => state.user.uid))
    .subscribe(result => this.loggedInUserUid = result);

    this.store$.select('organization').pipe(map(state => state.organization.uid))
    .subscribe(result => this.selectedOrgUid = result)
  }

  public onAddUser() {
    this.inviteUser$.pipe(map(user => user.uid)).subscribe( 
      result => {
        this.orgService.addMember(this.loggedInUserUid, result, this.selectedOrgUid);
      });
  }

}
