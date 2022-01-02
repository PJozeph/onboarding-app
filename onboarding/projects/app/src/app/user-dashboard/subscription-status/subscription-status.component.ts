import { Component, OnInit } from '@angular/core';
import { State } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';

import * as fromApp from "../../store/index"
import { StripeService } from '../services/stripe.service';

@Component({
  selector: 'app-subscription-status',
  templateUrl: './subscription-status.component.html',
  styleUrls: ['./subscription-status.component.css']
})
export class SubscriptionStatusComponent implements OnInit {


  loggedInUser : Observable<User>;
  activeSubscriptionId;
  public loading : boolean = true

  constructor(private state: State<fromApp.AppState>,
              private stripeService : StripeService) { }

  ngOnInit(): void {
    this.stripeService.getUserSubscription('cus_Ks8YAX5lbUPeED')
    .subscribe( res => 
      {
        this.activeSubscriptionId = res.data[0].items.data[0].price.product;
        this.loading = false;
      });
  }

}
