import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable, Subject } from 'rxjs';
import { GoalExtension } from '../../extension/modal/extension.goal.modal';
import { UserService } from '../../user/user.service';
import * as authActions from './../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new Subject<string>()

  constructor(private auth: Auth,
    private store: Store,
    private userService: UserService,
    private fireStore: Firestore) { }

  public emailSignUp(email: string, password: string): Observable<string> {
    createUserWithEmailAndPassword(this.auth, email, password).then((response) => {
      this.subject.next(response.user.uid);
    } )
    return this.subject.asObservable();
  }

  public updateName(userId: string, name: string) {
    const cityRef = doc(this.fireStore, 'accounts', userId);
    setDoc(cityRef, { name: name }, { merge: true });
  }

  public emailLogin(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public googleLogin(): Observable<User> {
    const subject = new Subject<User>()
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider).then(result => {
      result.user.getIdTokenResult().then(token => {
        window.localStorage.setItem('token', JSON.stringify(token));
      })
      const user = new User(
        result.user.uid,
        result.user.displayName,
        result.user.photoURL,
        new GoalExtension([]));

      this.store.dispatch(new authActions.LoginSuccess(user))
      window.localStorage.setItem('user', JSON.stringify(user));
      this.userService.addUser(user)
      subject.next(user);
    })
    return subject.asObservable()
  }

  public signOut() {
    window.localStorage.removeItem('user');
    this.userService.reloadUserList();
    this.store.dispatch(new authActions.Logout());
  }

}
