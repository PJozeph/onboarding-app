import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../auth/components/auth/auth.component';
import * as fromApp from '../store/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public isAuthDialogOpen : boolean = false;
  public isLoggedIn : boolean = false;

  constructor(private dialog : MatDialog,
              private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe((state => {
        if(state.user) {
            this.isLoggedIn = true
            this.dialog.closeAll();
          }
      }))
  }

  public onLogin() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'no-padding'
    this.isAuthDialogOpen = !this.isAuthDialogOpen;
    this.dialog.open(AuthComponent, dialogConfig).afterClosed()
      .subscribe(() => {
        this.isAuthDialogOpen = !this.isAuthDialogOpen;
      })
  }

  public onLogOut() {

  }

}
