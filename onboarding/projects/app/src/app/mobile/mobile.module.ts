import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from './components/mobile-header/mobile-header.component';
import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile/mobile.component';
import { LandingModule } from '../langing-page/landing.module';

@NgModule({
  declarations: [
    MobileComponent,
    MobileHeaderComponent,
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    LandingModule
  ], exports : [
    MobileHeaderComponent
  ]
})
export class MobileModule { }
