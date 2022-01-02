import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-auth-pin',
  templateUrl: './auth-pin.component.html',
  styleUrls: ['./auth-pin.component.css']
})
export class AuthPinComponent implements OnInit {

  constructor(private dialog : MatDialog,
              private router : Router) { }

  ngOnInit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'no-padding'
    this.dialog.open(AuthComponent, dialogConfig).afterClosed()
      .subscribe(() => {
        this.router.navigate(['organizations']);
      })  
  }

}
