import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';

import * as fromApp from '../../../../store/index'
import { StripeSessionService } from '../../../services/stripe-session.service';
import { loadStripe } from '@stripe/stripe-js'; // this is typescript
import { map, switchMap } from 'rxjs/operators';
import { StripeService } from 'projects/app/src/app/user-dashboard/services/stripe.service';


@Component({
  selector: 'app-price-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.css']
})
export class PriceCardComponent implements OnInit  {

  @Input('price') price : string;
  @Input('productId') productId : string;
  @Input('activeProductId') activeProductId : string = "default";
  @Input('buttonText') buttonText : string = 'Start Now';
  @Input('showPrice') showPrice : boolean = true;
  @Input('subscriptionId') subscriptionId : string = '';

  private stripePromise;
  private loggedInUser :User;
  public isSubscriptionActive = false;

  constructor(private store$ : Store<fromApp.AppState>, 
              private sessionService : StripeSessionService,
              private stripeService : StripeService) { }


  ngOnInit(): void {
    this.stripePromise  = loadStripe('pk_test_51JwC9WK22cRi3yGNIMty4rWiQR10AvlzL2e03VQuc0hBXcLZb4wPfBCmXsWo2FRi6k9mYqhRKnWlVmJ5YUqCrN4600KlTUUVDs');
    this.store$.select('auth').pipe(map( state => state.user)).subscribe(
      user => this.loggedInUser = user
    )
    if(this.productId == this.activeProductId) {
       this.isSubscriptionActive = true;
    }
  }

  public onCancel() {
    this.stripeService.cancelSubscription(this.subscriptionId).subscribe(
      res => {
        console.log("cancel response")
        console.log(res)
      }
    );
  }


  public async onCheckout(activeProductId : string){
    if(activeProductId) {
      this.stripeService.getUserSubscription(this.loggedInUser.stripeUid)
      .pipe(
        switchMap((subscription : any) => 
        this.stripeService.cancelSubscription(subscription.data[0].id)))
        .subscribe( res => {console.log(res)})
      }
      const stripe = await this.stripePromise;
      this.sessionService.getSession(this.loggedInUser.stripeUid, this.productId)
      .subscribe(session => {
        stripe.redirectToCheckout({
          sessionId : session.id
        })
      })
  }

}