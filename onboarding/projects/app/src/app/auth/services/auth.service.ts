import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserService } from 'projects/core/src/lib/services/user.service';
import { from, Observable } from 'rxjs';
import * as authActions from './../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth: Auth,
              private store: Store,
              private angularFireStore: AngularFirestore,
              private userService : UserService) { }

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

  public emailLogin(email: string, password: string): Observable<any> {
    const signInPromise = signInWithEmailAndPassword(this.auth, email, password);
    return from(signInPromise);
  }

  public signUpWithGoogle() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    return from(signInWithPopup(auth, provider)); 
  }

  public googleLogin() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth();
    signInWithPopup(auth, provider).then(result => {
     this.userService.getUserById(result.user.uid).subscribe( user => {
        this.store.dispatch(new authActions.LoginSuccess(user))
        window.localStorage.setItem('user', JSON.stringify(user));
      } );
    })
  }

  public signOut() {
    window.localStorage.removeItem('user');
    this.store.dispatch(new authActions.Logout());
  }

}
