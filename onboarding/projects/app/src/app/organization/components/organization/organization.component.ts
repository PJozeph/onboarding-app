import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  constructor(private materialDialog : MatDialog) { }

  ngOnInit(): void {
  }

  public onCreateOrganization() {
    this.materialDialog.open(CreateOrganizationComponent)
  }

}
