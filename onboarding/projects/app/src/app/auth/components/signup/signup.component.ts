import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CustomValidationService } from '../../services/custom-validation.service';

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

  private signUpSubscription: Subscription;

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
      })
    }
    );
  }

  public onCreateAccount(email: string, pass: string, userName: string) {
    this.authService.emailSignUp(email, pass);
  }

  public onGoogleSignUp() {
    this.authService.googleLogin();
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  public onSubmit() {
    this.signUpSubscription = this.authService.emailSignUp(this.userEmail, this.userPassword)
    .subscribe((response) => {
      this.authService.updateName(response, this.userName);
      this.dialogRef.close()
      }
    );
  }

  ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
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
