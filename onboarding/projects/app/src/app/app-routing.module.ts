import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent as LandingPageComponent } from './langing-page/landing-page.component';

const routes: Routes = [
  { path : "", redirectTo: 'welcome' , pathMatch : 'full' },
  { path: 'welcome', 
    loadChildren :() => import('./langing-page/landing.module')
    .then(m => m.LandingModule)},
  { path: 'users', 
    loadChildren: () => import('./users/users.module')
    .then(m => m.UsersModule)},
  { path : 'user/:userid', 
    loadChildren : ()=> import('./tasks/task.module')
    .then(m => m.TaskModule)},
  { path : 'auth', 
    loadChildren : ()=> import('././auth/auth.module')
    .then(m => m.AuthModule)},
  { path : 'userDashboard', 
    loadChildren : ()=> import('./user-dashboard/user-dashboard.module')
    .then(m => m.UserDashboardModule) },
  { path : 'organizations', 
     loadChildren : ()=> import('./organization/organization.module')
    .then(m => m.OrganizationModule) },
  { path : 'pricing', 
     loadChildren : ()=> import('./pricing/pricing.module')
    .then(m => m.PricesModule) },
  { path : 'about' , loadChildren : () => import('./about/about-routing.module')
    .then( m => m.PricingRoutingModule)},
  { path : 'mobile' , loadChildren : () => import('./mobile/mobile.module')
    .then( m => m.MobileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
