import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from 'projects/core/src/lib/components/profile-card/user.modal';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private storage : Storage) { }

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
    const user = new User(parseInt(result.user.uid),
                          result.user.displayName,
                          result.user.photoURL, 
                          null)
    subject.next(user);
  })
  return subject.asObservable()
}



}
