import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromApp from '../../store/index' 

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private userId: string;
  private membership : any;

  constructor(private angularFirestore : AngularFirestore,
              private store$ : Store<fromApp.AppState>) {
    this.store$.select('auth').pipe(
      map(state => state.user),
      tap(user => this.userId = user.uid),
      switchMap( user => {
          return angularFirestore
          .collection('accounts')
          .doc(user.uid)
          .set('pro-membership')
      })
    )
   }

  public processPayment(token : string) {
    return this.angularFirestore
          .collection('accounts')
          .doc(this.userId + '/pro-membership')
          .update({token : token})

  }
}
