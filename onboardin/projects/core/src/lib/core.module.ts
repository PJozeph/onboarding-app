import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfilesComponent } from './components/profile-card/profiles/profiles.component';
import { ButtonComponent } from './components/button/button.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { OnHoverDirective } from './directives/onhover.directive';
import { AddNewcomerComponent } from './pages/addnewcomer/addnewcomer.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ProfileCardComponent,
    ProfilesComponent,
    ButtonComponent,
    LeftNavigationComponent,
    OnHoverDirective,
    AddNewcomerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ProfileCardComponent,
    ProfilesComponent,
    ButtonComponent,
    LeftNavigationComponent,
    AddNewcomerComponent,
    OnHoverDirective
  ]
})
export class CoreModule { }
