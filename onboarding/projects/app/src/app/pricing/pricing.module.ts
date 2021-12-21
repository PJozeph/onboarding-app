import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingComponent } from './components/prices/pricing.component';
import { PricingRoutingModule } from './pricing-routing';
import { PriceCardComponent } from './components/prices/price-card/pricing-card.component';

@NgModule({
  declarations: [
    PricingComponent,
    PriceCardComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule
  ]
})
export class PricesModule { }
