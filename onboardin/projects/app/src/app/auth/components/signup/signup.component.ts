import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomValidationService } from '../../services/custom-validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public userName : string = ''
  public userEmail : string = ''
  public userPassword : string = ''
  public userPasswordConfirm : string = ''

  signUpForm: FormGroup;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
      userEmail: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
      userPassword: new FormControl('', { validators: [Validators.minLength(7)], updateOn: 'blur' }),
      userPasswordConfirm: new FormControl('', {
            validators: [Validators.minLength(7),
            RetypeConfirm('userPassword')],
            updateOn: 'blur'})
        }
    );
  }

  public onCreateAccount(email : string , pass : string ) {
    this.authService.emailSignUp(email, pass);
  }

  public onGoogleSignUp() {
    this.authService.googleLogin();
  }

  get signUpFormControl() {
    return this.signUpForm.controls;
  }

  public onSubmit(){
    this.authService.emailSignUp(this.userEmail, this.userPassword);
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

