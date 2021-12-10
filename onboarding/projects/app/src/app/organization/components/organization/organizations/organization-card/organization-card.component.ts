import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Organization } from '../../../../services/organization.service';

import * as fromApp from '../../../../../store/index';
import * as orgActions from './../../../../store/organization.actions';

@Component({
  selector: 'app-organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.css']
})
export class OrganizationCardComponent implements OnInit {

  @Input() organization : Organization

  constructor(private router : Router,
              private store$ : Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }
  
  public onOrgSelect() {
    this.store$.dispatch( new orgActions.SelectOrganization(this.organization));
    window.localStorage.setItem('selectedOrg', JSON.stringify(this.organization));
    this.router.navigate(['users'])
  }

}
