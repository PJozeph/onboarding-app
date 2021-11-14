import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth/components/signin/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public isAuthDialogOpen = false;

  constructor(private dialog : MatDialog) { }

  ngOnInit(): void {
    this.dialog.afterOpened.subscribe( result => this.isAuthDialogOpen = !this.isAuthDialogOpen);
    this.dialog.afterAllClosed.subscribe( result => this.isAuthDialogOpen = !this.isAuthDialogOpen);
  }

  public onLogin(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'no-padding'
    this.dialog.open(AuthComponent, dialogConfig)

  }

}
