import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'projects/core/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { GoalCommentEffects } from './extension/goal/comment-item/store/goal-comment.effect'

import { SubscriptionEffect } from './user-dashboard/subscription-status/store/subscription.effects';
import { MobileModule } from './mobile/mobile.module';
import { LoginEffect } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MobileModule,
    CoreModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({maxAge : 5}),
    EffectsModule.forRoot([GoalCommentEffects, SubscriptionEffect, LoginEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
