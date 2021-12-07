import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditLinkComponent } from './components/share-link/edit/edit-link/edit-link.component';
import { ShareLinkComponent } from './components/share-link/share-link.component';

const routes: Routes = [
  { path : "", component : ShareLinkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareLinkRoutingModule { }