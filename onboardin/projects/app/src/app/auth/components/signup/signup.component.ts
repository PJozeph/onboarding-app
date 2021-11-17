import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      userName: new FormControl('' , Validators.required),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userPassword: new FormControl('', Validators.minLength(7)),
      userPasswordConfirm: new FormControl('', Validators.minLength(7))
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
