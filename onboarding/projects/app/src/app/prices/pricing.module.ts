import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricesComponent } from './components/prices/prices.component';
import { PricingRoutingModule } from './prices-routing';
import { PriceCardComponent } from './components/prices/price-card/price-card.component';

@NgModule({
  declarations: [
    PricesComponent,
    PriceCardComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule
  ]
})
export class PricesModule { }
