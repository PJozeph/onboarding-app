import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/app/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http : HttpClient) { }

  public getUserSubscription(stripUserId : string) : any {

    let param = new HttpParams()
    .set('customer', stripUserId)

    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + environment.stripeKey,
    });

    const options = { params: param, headers: headers };

    return this.http.get('https://api.stripe.com/v1/subscriptions', options);
  }
}
