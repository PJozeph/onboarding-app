import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfilesComponent } from './components/profile-card/profiles/profiles.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ProfileCardComponent,
    ProfilesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ProfileCardComponent,
    ProfilesComponent
  ]
})
export class CoreModule { }
