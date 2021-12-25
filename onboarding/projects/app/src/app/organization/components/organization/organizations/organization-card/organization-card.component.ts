import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../../../../store/index';
import { Organization, OrganizationService } from '../../../../services/organization.service';
import * as orgActions from './../../../../store/organization.actions';


@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.css']
})
export class OrganizationCardComponent implements OnInit {

  @Input() organization : Organization;
  public isGroupOwner : Observable<boolean>;

  constructor(private router : Router,
              private store$ : Store<fromApp.AppState>,
              private orgService: OrganizationService) { }

  ngOnInit(): void {
    this.isGroupOwner = this.store$.select('auth').pipe(
    map(state => state.user),
    map(user => this.organization.ownerUid === user.uid));
  }
  
  public onOrgSelect() {
    this.store$.dispatch( new orgActions.SelectOrganization(this.organization));
    window.localStorage.setItem('selectedOrg', JSON.stringify(this.organization));
    this.router.navigate(['users'])
  }

  public onRemoveOrg(orgUid : string) {
    this.orgService.removeOrganization(orgUid);
  }

}
