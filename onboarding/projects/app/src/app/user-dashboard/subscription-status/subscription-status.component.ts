import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'projects/core/src/lib/modal/user/user.modal';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as fromApp from "../../store/index";
import { StripeService } from '../services/stripe.service';


@Component({
  selector: 'app-subscription-status',
  templateUrl: './subscription-status.component.html',
  styleUrls: ['./subscription-status.component.css']
})
export class SubscriptionStatusComponent implements OnInit {


  loggedInUser : Observable<User>;
  activeProductId : string;
  subscriptionId: string;
  public loading : boolean = true;

  constructor(private state$ : Store<fromApp.AppState>,
              private stripeService : StripeService) { }

  ngOnInit(): void {
    this.state$.select('auth').pipe(switchMap(
      (user) => this.stripeService.getUserSubscription(user.user.stripeUid)))
      .subscribe( (res : any) => {
        console.log(res)
        this.subscriptionId = res.data[0] ? res.data[0].id : '' ;
        this.activeProductId = res.data[0] ? res.data[0].plan.id : '';
        this.loading = false;
      });
  }

}
