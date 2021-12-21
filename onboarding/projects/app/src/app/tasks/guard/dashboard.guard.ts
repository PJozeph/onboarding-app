import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from '../../organization/services/organization.service';

import * as fromApp from '../../store/index';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  private loggedInUser : User;
  private selectedUser : User;
  private selectedOrg : Organization;

  constructor(private store$ : Store<fromApp.AppState>) {
    this.store$.pipe(map(state => state.auth.user))
    .subscribe(user => this.loggedInUser = user);

    this.store$.pipe(map(state => state.selectedUser.user))
    .subscribe(user => this.selectedUser = user);

    this.store$.pipe(map(state => state.organization.organization))
    .subscribe(user => this.selectedOrg = user);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("dashboard guard")
    if(this.selectedOrg.editorsUid.includes(this.loggedInUser.uid)|| 
       this.selectedOrg.ownerUid === this.loggedInUser.uid ||
       this.loggedInUser.uid === this.selectedUser.uid) {
      return true
    }
    alert("Only editors and group owner can have a look other profile")
    return false;
  }
  
}
