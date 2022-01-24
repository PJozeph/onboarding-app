import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as fromApp from '../app/store/index';
import * as subscriptionStatus from '../app/user-dashboard/subscription-status/store/subscription.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyOnboard.io';

  public isMobile : boolean;

  constructor(private deviceDetector : DeviceDetectorService,
              private router : Router,
              private store : Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new subscriptionStatus.GetSubscriptionStatus)
    this.isMobile = this.deviceDetector.isMobile();
    if(this.isMobile) {
      this.router.navigate(['mobile'])
    } else {
      this.router.navigate(['welcome'])
    }
  }

}
