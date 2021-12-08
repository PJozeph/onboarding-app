import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareLinkComponent } from './components/share-link/share-link.component';
import { ShareLinkRoutingModule } from './share-link.routing';
import { CoreModule } from 'projects/core/src/public-api';
import { LinksComponent } from './components/share-link/links/links.component';
import { LinkComponent } from './components/share-link/links/link/link.component';
import { EditLinkComponent } from './components/share-link/edit/edit-link/edit-link.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShareLinkComponent,
    LinksComponent,
    LinkComponent,
    EditLinkComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ShareLinkRoutingModule
  ]
})
export class ShareLinkModule { }
