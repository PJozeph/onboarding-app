import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserCardComponent } from './user-card/usercard.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ], 
  exports : [
    UserCardComponent
  ]
})
export class UsersModule { }
