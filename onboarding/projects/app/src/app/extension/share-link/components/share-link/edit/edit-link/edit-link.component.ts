import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Link } from 'projects/app/src/app/extension/modal/link.extension.modal';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Subscription } from 'rxjs';
import * as fromApp from '../../../../../../store/index';
import { ShareLinkExtensionService } from '../../../../share-link.extension.service';


@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.css']
})
export class EditLinkComponent implements OnInit, OnDestroy {

  private linkSubscription : Subscription;;
  public selectedLink : Link;
  private selectedUser : User;

  constructor(private linkService : ShareLinkExtensionService,
              private store$ : Store<fromApp.AppState>,
              @Inject(MAT_DIALOG_DATA) public data: {},
              private dialogRef: MatDialogRef<EditLinkComponent>) { }
  
  ngOnInit(): void {
    this.store$.select('selectedUser').subscribe(user => {
      this.selectedUser = user.user
    })
   this.linkSubscription = this.linkService.getLinkById(this.selectedUser.uid, this.data['selectedLinkId'])
    .subscribe( (response : Link) => {
      this.selectedLink = response
    })
  }
  
  ngOnDestroy(): void {
    this.linkSubscription.unsubscribe();
  }

  public onCancel() {
    this.dialogRef.close();
  }

  public onSave() {
    const updatedLink : Link = {
      linkId : this.data['selectedLinkId'],
      name: this.selectedLink.name,
      url : this.selectedLink.url
    }
    this.linkService.updateLink(this.selectedUser.uid, updatedLink);
    this.dialogRef.close();
  }

}
