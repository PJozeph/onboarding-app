import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricesComponent } from './components/prices/prices.component';

const routes: Routes = [
  { path: '', component: PricesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule { }