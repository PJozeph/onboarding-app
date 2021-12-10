import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationRouting } from './organization-routing.module';
import { OrganizationsComponent } from './components/organization/organizations/organizations.component';
import { OrganizationCardComponent } from './components/organization/organizations/organization-card/organization-card.component';
import { CreateOrganizationComponent } from './components/organization/create-organization/create-organization.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationsComponent,
    OrganizationCardComponent,
    CreateOrganizationComponent
  ],
  imports: [
    FormsModule,
    OrganizationRouting,
    CommonModule
  ]
})
export class OrganizationModule { }
