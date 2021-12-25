import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'projects/app/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeSessionService {

  constructor(private httpClient: HttpClient) { }

  public getSession(customerId : string , productId : string) : any {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + environment.stripeKey,
    });

    let param = new HttpParams()
    .set('customer', customerId)
    .set('mode', 'subscription')
    .set('cancel_url', 'https://myonboard.io/fail')
    .set('success_url', 'https://myonboard.io/success')
    .set('line_items[0][price]', productId)
    .set('line_items[0][quantity]','1')
    return this.httpClient.post('https://api.stripe.com/v1/checkout/sessions', param , { headers : headers})
  }
}
