import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignupComponent } from '.././signup/signup.component';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  isSignUp : boolean = false

  constructor(private authService: AuthService, 
              private dialog : MatDialog) { }

  ngOnInit(): void {
    this.dialog.afterAllClosed.subscribe( action => this.dialog.closeAll)
  }

  public onEmailLogin(){
  }

  public onGoogleLogin(){
    this.authService.googleLogin();
  }

  public onCreateAccount() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(SignupComponent, dialogConfig).afterClosed().subscribe(
      response => {
         this.dialog.closeAll();
      }  
    )
  }

  public onAuthSwitch(){
    this.isSignUp = !this.isSignUp
  }

}