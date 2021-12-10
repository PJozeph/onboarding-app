import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Organization, OrganizationService } from '../../../services/organization.service';

import * as fromApp from '../../../../store/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit, OnDestroy {

  public organizations : Organization [];
  private loggedInUser : User;
  private userSubscription : Subscription;
  public isLoading : boolean = true;

  constructor(private organizationService : OrganizationService,
              private store$ : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store$.select('auth').subscribe(state => this.loggedInUser = state.user);
    this.userSubscription =  this.organizationService.getUserOrganization(this.loggedInUser.uid)
    .subscribe((response : Organization[]) => {
      this.organizations = response;
      this.isLoading = false;
    });
  }

  ngOnDestroy() : void {
    this.userSubscription.unsubscribe();
  }

}
