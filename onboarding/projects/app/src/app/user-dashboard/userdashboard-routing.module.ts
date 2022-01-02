import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';

const routes: Routes = [
    { path : '', component : UserDashboardComponent},
    { path : 'subscription-status', component : SubscriptionStatusComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserDashboardRouting { }