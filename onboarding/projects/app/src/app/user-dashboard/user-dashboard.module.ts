import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserDashboardRouting } from './userdashboard-routing.module';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';
import { HttpClientModule } from '@angular/common/http';
import { PricesModule } from '../pricing/pricing.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    SubscriptionStatusComponent
  ],
  imports: [
    CommonModule,
    UserDashboardRouting,
    HttpClientModule,
    PricesModule
  ]
})
export class UserDashboardModule { }
