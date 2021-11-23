import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from 'projects/core/src/lib/components/user-card/user.modal';
import { Observable, Subject } from 'rxjs';
import { GoalExtension } from '../../extension/modal/extension.goal.modal';
import { Extension } from '../../extension/modal/extension.modal';
import { UserService } from '../../user/user.service';
import * as authActions from './../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, 
              private store : Store,
              private userService : UserService  ) { }

  public async emailSignUp(email : string, password  : string) : Promise<void>  {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    await  updateProfile(
      credential.user, { displayName: credential.user.displayName }
    );
    await  sendEmailVerification(credential.user);
  }

  public async emailLogin(email: string, password: string): Promise<any> {
    return  signInWithEmailAndPassword(this.auth, email, password);
}

public googleLogin() : Observable<User> {
  const subject = new Subject<User>()
  const provider = new GoogleAuthProvider()
  const auth = getAuth();
  signInWithPopup(auth, provider).then( result  => {
    result.user.getIdTokenResult().then( token => {
      window.localStorage.setItem('token', JSON.stringify(token));
    })
    const user = new User(result.user.uid,
                          result.user.displayName,
                          result.user.photoURL,
                          new GoalExtension([]));

    this.store.dispatch(new  authActions.LoginSuccess(user))
    window.localStorage.setItem('user', JSON.stringify(user));
    this.userService.addUser(user)
    subject.next(user);
  })
  return subject.asObservable()
}

public signOut() {
  window.localStorage.removeItem('user');
  this.userService.reloadUserList();
  this.store.dispatch(new  authActions.Logout());
}

}
