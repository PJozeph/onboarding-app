import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadStripe } from '@stripe/stripe-js'; // this is typescript
import { StripeService } from 'projects/app/src/app/user-dashboard/services/stripe.service';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from '../../../../store/index';
import { StripeSessionService } from '../../../services/stripe-session.service';

import * as subAction from '../../../../user-dashboard/subscription-status/store/subscription.actions'


@Component({
  selector: 'app-price-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.css']
})
export class PriceCardComponent implements OnInit  {

  @Input('price') price : string;
  @Input('title') title : string;
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
              private stripeService : StripeService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }


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
        this.router.navigate([this.activatedRoute])
      }
    );
  }


  public async onCheckout(activeProductId : string) {
    if(activeProductId) {
      this.stripeService.getUserSubscription(this.loggedInUser.stripeUid)
      .pipe(
        switchMap((subscription : any) => 
        this.stripeService.cancelSubscription(subscription.data[0].id))).subscribe()
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