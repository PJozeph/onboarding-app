import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateOrganizationComponent } from './components/organization/create-organization/create-organization.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationCardComponent } from './components/organization/organizations/organization-card/organization-card.component';
import { OrganizationsComponent } from './components/organization/organizations/organizations.component';
import { OrganizationRouting } from './organization-routing.module';

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
