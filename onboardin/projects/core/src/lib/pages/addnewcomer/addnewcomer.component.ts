import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'projects/app/src/app/auth/services/auth.service';
import * as authAction from 'projects/app/src/app/auth/store/auth.actions';
import * as fromApp from 'projects/app/src/app/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'lib-addnewcomer',
  templateUrl: './addnewcomer.component.html',
  styleUrls: ['./addnewcomer.component.css']
})
export class AddNewcomerComponent implements OnInit {

  isAuthenticated = false;

  constructor(private authService: AuthService,
                private store: Store<fromApp.AppState>) { }

    user  : Observable<fromApp.AppState>;

  ngOnInit(): void {
    console.log("state")
    this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe( user => {
      this.isAuthenticated = !!user;
    })
  }

  public login(){
    console.log(this.user)
    this.authService.googleLogin();

  }
}
