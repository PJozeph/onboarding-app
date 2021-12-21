import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InviteUserComponent } from './invite-user/invite-user.component';
import { UserCardComponent } from './user-card/usercard.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    InviteUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule
  ], 
  exports : [
    UserCardComponent
  ]
})
export class UsersModule { }
