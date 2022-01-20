import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'projects/app/src/environments/environment';
import { switchMap } from 'rxjs/operators';

import * as fromApp from '../../store/index';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http : HttpClient, 
              private state$ : Store<fromApp.AppState>) { }

  public getUserSubscription(stripUserId : string) : any {

    let param = new HttpParams()
    .set('customer', stripUserId)

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + environment.stripeKey,
    });

    const options = { params: param, headers: headers };

    return this.http.get('https://api.stripe.com/v1/subscriptions', options);
  }

  public cancelSubscription(subscriptionId : string) {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + environment.stripeKey,
    });

    return this.http.delete('https://api.stripe.com/v1/subscriptions/' + subscriptionId , {headers : headers} );
  }

  public getActivatedSubscriptionId() {
    return this.state$.select('auth').pipe(switchMap(
      (user) => this.getUserSubscription(user.user.stripeUid)));
  }

}