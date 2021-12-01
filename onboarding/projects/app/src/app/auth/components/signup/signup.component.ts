import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public userName: string = ''
  public userEmail: string = ''
  public userPassword: string = ''
  public userPasswordConfirm: string = ''

  public displaySpinner : boolean = false;

  signUpForm: FormGroup;

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      userEmail: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
      userPassword: new FormControl('', { validators: [Validators.minLength(7)], updateOn: 'blur' }),
      userPasswordConfirm: new FormControl('', {
        validators: [Validators.minLength(7),
        RetypeConfirm('userPassword')],
        updateOn: 'blur'
      })}
    );
  }

  public onGoogleSignUp() {
    this.authService.googleLogin()
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  public onSubmit() {
    this.displaySpinner = true
    this.authService.emailSignUp(this.userEmail, this.userPassword)
    .then((user) => {
        setTimeout(() => {
          this.authService.updateName(user.user.uid, this.userName).then( 
            () =>{
              this.displaySpinner = false
              this.dialogRef.close();
            }
          );
        }, 5500);
      }
    );
  }

  ngOnDestroy(): void {
  }
}


function RetypeConfirm(newPassword: string): ValidatorFn {
  return (control: FormControl) => {
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(newPassword).value === control.value ? null : { mismatch: true };
  };
}
