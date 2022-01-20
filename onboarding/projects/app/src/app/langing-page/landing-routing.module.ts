import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class LandingRoutingModule { }