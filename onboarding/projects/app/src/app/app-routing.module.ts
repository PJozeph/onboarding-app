import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent as LandingPageComponent } from './langing-page/langing-page.component';

const routes: Routes = [
  { path : "", redirectTo: 'welcome' , pathMatch : 'full' },
  { path: 'welcome', component : LandingPageComponent},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path : 'user/:userid', loadChildren : ()=> import('./tasks/task.module').then(m => m.TaskModule)},
  { path : 'auth', loadChildren : ()=> import('././auth/auth.module').then(m => m.AuthModule) },
  { path : 'userDashboard', loadChildren : ()=> import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule) },
  { path : 'organizations', loadChildren : ()=> import('./organization/organization.module').then(m => m.OrganizationModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
