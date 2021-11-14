import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../auth/components/signin/auth.component';
import { AuthService } from '../auth/services/auth.service';
import * as fromApp from '../store/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public isAuthDialogOpen = false;

  constructor(private dialog : MatDialog,
              private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.dialog.afterOpened.subscribe( result => this.isAuthDialogOpen = !this.isAuthDialogOpen);
    this.dialog.afterAllClosed.subscribe( result => this.isAuthDialogOpen = !this.isAuthDialogOpen);
    this.store.select('auth').subscribe((state => {
        if(state.user) {
            this.dialog.closeAll();
          }
      }))
  }

  public onLogin(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'no-padding'
    this.dialog.open(AuthComponent, dialogConfig)
  }

}
