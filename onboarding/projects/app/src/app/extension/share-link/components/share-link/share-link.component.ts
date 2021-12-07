import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InputDialogService, InputDialogSource } from 'projects/core/src/lib/dialog/input/services/input.service';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromApp from "../../../../store/index";
import { Link } from '../../../modal/link.extension.modal';
import { ShareLinkExtensionService } from '../../share-link.extension.service';

@Component({
  selector: 'app-share-link',
  templateUrl: './share-link.component.html',
  styleUrls: ['./share-link.component.css']
})
export class ShareLinkComponent implements OnInit, OnDestroy {

  private subscription : Subscription;
  public selectedUser : User;
  public userLinks : Link [];
  public isLoading : boolean = true;

  constructor(private inputService : InputDialogService,
              private shareLinkService : ShareLinkExtensionService,
              private store$ : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store$.select('selectedUser').subscribe(user => {
      window.localStorage.setItem('selectedUser', JSON.stringify(user.user))
      this.selectedUser = user.user
    })

   this.subscription = this.inputService.source()
   .pipe(filter(source => source.type === 'SHARE_LINK'))
   .subscribe(
      (source : InputDialogSource) => {
          this.shareLinkService.addLink(
            this.selectedUser.uid, 
            {name : source.title, 
            url : source.description} )
      }
    )

    this.shareLinkService.getLinks(this.selectedUser.uid)
    .subscribe( (links : Link[]) => {
      this.userLinks = links;
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
