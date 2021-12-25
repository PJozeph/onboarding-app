import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import * as authActions from './../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,
    private store: Store,
    private angularFireStore: AngularFirestore) { }

  public async emailSignUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  public updateName(userId: string, name: string) {
    return this.angularFireStore.collection("accounts")
    .doc(userId)
    .update({
      displayName : name
    }).catch(error => {console.log(error)})
  }

  public emailLogin(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  public googleLogin() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider).then(result => {
      result.user.getIdTokenResult().then(token => {
        window.localStorage.setItem('token', JSON.stringify(token));
      })
      const user = new User(
        result.user.uid,
        'stripeId',
        result.user.displayName,
        result.user.photoURL);

      this.store.dispatch(new authActions.LoginSuccess(user))
      window.localStorage.setItem('user', JSON.stringify(user));
    })
  }

  public signOut() {
    window.localStorage.removeItem('user');
    this.store.dispatch(new authActions.Logout());
  }

}
