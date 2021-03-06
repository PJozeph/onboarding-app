import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import * as fromApp from "../../store/index";
import * as subscriptionActions from '../../user-dashboard/subscription-status/store/subscription.actions';
import { StripeService } from '../services/stripe.service';



@Component({
  selector: 'app-subscription-status',
  templateUrl: './subscription-status.component.html',
  styleUrls: ['./subscription-status.component.css']
})
export class SubscriptionStatusComponent implements OnInit {


  activeProductId : string;
  subscriptionId: string;
  public loading : boolean = true;

  constructor(private state$ : Store<fromApp.AppState>,
              private stripeService : StripeService) { }

  ngOnInit(): void {
    this.state$.select('auth').pipe(switchMap(
      (user) => this.stripeService.getUserSubscription(user.user.stripeUid)))
      .subscribe( (res : any) => {
        this.subscriptionId = res.data[0] ? res.data[0].id : '' ;
        this.activeProductId = res.data[0] ? res.data[0].plan.id : '';
        this.loading = false;
      });
  }

}
