import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { ShareLinkRoutingModule } from './share-link.routing.module';

@NgModule({
  declarations: [
    ShareLinkComponent,
  ],
  imports: [
    CommonModule,
    ShareLinkRoutingModule
  ]
})
export class ShareLinkModule { }
