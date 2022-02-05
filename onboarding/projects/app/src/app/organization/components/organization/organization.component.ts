import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from './../../../store/index';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  public isMemberStatusActive : Observable<boolean>;

  constructor(private materialDialog : MatDialog,
              private store$ : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.isMemberStatusActive = this.store$.select('subscription')
    .pipe(map(state => state.isActive));
  }

  public onCreateOrganization() {
    this.materialDialog.open(CreateOrganizationComponent)
  }

}
