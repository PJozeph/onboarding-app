import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { UserService } from 'projects/core/src/lib/services/user.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import * as fromApp from '../store/index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public isAuthDialogOpen : boolean = false;
  public isLoggedIn : boolean = false;
  public loggedInUser : User;
  public isMembershipActive: boolean;
  public isLoading : boolean = true;

  constructor(private dialog : MatDialog,
              private store : Store<fromApp.AppState>,
              private authService : AuthService,
              private router : Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.store.select('subscription')
    .pipe(map( state => state.isActive))
    .subscribe( isActive => this.isMembershipActive = isActive )
    this.store.select('auth').subscribe((state => {
      if(state.user) {
          this.loggedInUser = state.user;
            this.isLoggedIn = true;
            this.dialog.closeAll();
          } else {
            this.isLoggedIn = false;
          }
      }))
  }

  public onLogoClick() {
    this.router.navigate(['/'])
  }

  public onLogin() {
    this.router.navigate(['auth'])
  }

  public onLogOut() {
    this.authService.signOut();
  }

  public onSelect() {
    this.router.navigate(['userDashboard'])
  }

}
