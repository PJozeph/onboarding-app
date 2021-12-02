import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPinComponent } from './auth/components/auth-pin/auth-pin.component';
import { LandingPageComponent as LandingPageComponent } from './langing-page/langing-page.component';

const routes: Routes = [
  { path : "", redirectTo: 'welcome' , pathMatch : 'full' },
  { path: 'welcome', component : LandingPageComponent},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path : 'user/:userid', loadChildren : ()=> import('./tasks/task.module').then(m => m.TaskModule)},
  { path : 'auth', loadChildren : ()=> import('././auth/auth.module').then(m => m.AuthModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
