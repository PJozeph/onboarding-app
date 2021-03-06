import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserCredential } from 'firebase/auth';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as authActions from '../../store/auth.actions';
import { SignupComponent } from '.././signup/signup.component';
import * as fromApp from './../../../store/index';

@Component({
  selector: 'app-signin',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {

  public userEmail : string = '';
  public userPass : string = '';

  private subscription : Subscription;
  authForm : FormGroup;

  constructor(private authService: AuthService, 
              private dialog : MatDialog,
              private store$ : Store<fromApp.AppState>,
              private router : Router) { }

  ngOnInit(): void {
    this.subscription = this.dialog.afterAllClosed.subscribe( () => this.dialog.closeAll);
    this.authForm = new FormGroup({
      userEmail: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
      userPass: new FormControl('', { validators: [Validators.required, Validators.minLength(7)], updateOn: 'blur'})
    })
  }

  public onEmailLogin() {
    this.store$.dispatch( new authActions.LoginStart(this.userEmail, this.userPass));
    this.router.navigate([''])
  }

  public onGoogleLogin(){
    this.authService.googleLogin();
  }

  public onCreateAccount() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(SignupComponent, dialogConfig).afterClosed().subscribe(
      () => {
         this.dialog.closeAll();
      }  
    )
  }

  get authFormControl() {
    return this.authForm.controls;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}