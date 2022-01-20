import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileComponent } from './mobile/mobile.component';

const routes: Routes = [
  { path: '', component: MobileComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class MobileRoutingModule { }