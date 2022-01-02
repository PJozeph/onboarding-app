import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';

import * as fromApp from '../../../../store/index'
import { StripeSessionService } from '../../../services/stripe-session.service';
import { loadStripe } from '@stripe/stripe-js'; // this is typescript
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-price-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.css']
})
export class PriceCardComponent implements OnInit  {

  @Input('price') price : string;
  @Input('productId') productId : string;
  @Input('activeProductId') activeProductId : string;
  @Input('buttonText') buttonText : string = 'Start Now';
  @Input('showPrice') showPrice : boolean = true;

  private stripePromise;
  private loggedInUser :User;
  public isSubscriptionActive = false;

  constructor(private store$ : Store<fromApp.AppState>, 
    private sessionService : StripeSessionService) { }


  ngOnInit(): void {
    this.stripePromise  = loadStripe('pk_test_51JwC9WK22cRi3yGNIMty4rWiQR10AvlzL2e03VQuc0hBXcLZb4wPfBCmXsWo2FRi6k9mYqhRKnWlVmJ5YUqCrN4600KlTUUVDs');
    this.store$.select('auth').pipe(map( state => state.user)).subscribe(
      user => this.loggedInUser = user
    )
    if(this.productId == this.activeProductId) {
       this.isSubscriptionActive = true;
    }
  }


  public async onCheckout(){
      const stripe = await this.stripePromise;
      this.sessionService.getSession(this.loggedInUser.stripeUid, this.productId)
      .subscribe(session => {
        stripe.redirectToCheckout({
          sessionId : session.id
        })
      })
  }

}