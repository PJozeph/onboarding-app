import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { ShareLinkRoutingModule } from './share-link.routing.module';
import { CoreModule } from 'projects/core/src/public-api';

@NgModule({
  declarations: [
    ShareLinkComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ShareLinkRoutingModule
  ]
})
export class ShareLinkModule { }
