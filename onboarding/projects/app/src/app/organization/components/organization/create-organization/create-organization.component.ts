import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Organization, OrganizationService } from '../../../services/organization.service';

import * as fromApp from '../../../../store/index';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent implements OnInit {

  public loggedInUser: User;
  public activeMember: boolean;

  constructor(private organizationService: OrganizationService,
    private store$: Store<fromApp.AppState>,
    private dialogRef: MatDialogRef<CreateOrganizationComponent>,
    private router: Router) { }

  public organizationName: string = ''

  ngOnInit(): void {
    this.store$.select('auth').subscribe(state => this.loggedInUser = state.user);
    this.store$.select('subscription')
      .subscribe(state => this.activeMember = state.isActive);
  }

  public onCreate() {
    const org: Organization = {
      ownerUid: this.loggedInUser.uid,
      name: this.organizationName,
      editorsUid: [],
      members: [this.loggedInUser.uid]
    }
    this.organizationService.createOrganization(org).then(
      () => this.dialogRef.close()
    )
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public pricing() {
    this.router.navigate(['userDashboard/subscription-status']);
    this.dialogRef.close();
  }

  public auth() {
    this.router.navigate(['auth']);
    this.dialogRef.close();
  }

}
