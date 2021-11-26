import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile
} from '@angular/fire/auth';
import { collection, DocumentReference, Firestore, getDocs, doc, query, where , setDoc} from '@angular/fire/firestore';
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

  doc: DocumentReference;

  constructor(private auth: Auth,
    private store: Store,
    private userService: UserService,
    private fireStore: Firestore) { }

  public async emailSignUp(email: string, password: string, name: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const accounts = collection(this.fireStore, "accounts");
    const account = query(accounts, where("uid", "==", credential.user.uid));
    const querySnapshot = await getDocs(account);
    querySnapshot.forEach((user) => {
      const userRef = doc(this.fireStore, 'accounts', user.id);
      setDoc(userRef, { name: name }, { merge: true });
    })
    await updateProfile(credential.user, { displayName: credential.user.displayName, });
    await sendEmailVerification(credential.user);
  }

  public async emailLogin(email: string, password: string): Promise<any> {
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
      const user = new User(result.user.uid,
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
