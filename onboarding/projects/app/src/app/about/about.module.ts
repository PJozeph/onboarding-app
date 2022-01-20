import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { PricingRoutingModule } from '../pricing/pricing-routing';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule
  ]
})
export class AboutModule { }
