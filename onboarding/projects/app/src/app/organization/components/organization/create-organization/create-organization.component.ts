import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Organization, OrganizationService } from '../../../services/organization.service';

import * as fromApp from '../../../../store/index';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css']
})
export class CreateOrganizationComponent implements OnInit {

  public loggedInUser : User;

  constructor(private organizationService : OrganizationService,
             private store$ : Store<fromApp.AppState>,
             private dialogRef: MatDialogRef<CreateOrganizationComponent>) { }

  public organizationName : string = ''

  ngOnInit(): void {
    this.store$.select('auth').subscribe(state => this.loggedInUser =  state.user);
  }

  public onCreate() {
    const org : Organization = {
        ownerUid : this.loggedInUser.uid,
        name : this.organizationName,
        editorsUid : [], 
        members : [this.loggedInUser.uid]}
    this.organizationService.createOrganization(org).then(
      () => this.dialogRef.close()
    )
  }

  public onCancel() {
    this.dialogRef.close();
  }

}
