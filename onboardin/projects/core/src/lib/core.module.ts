import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { environment } from './../../../app/src/environments/environment';
import { ButtonComponent } from './components/left-navigation/button/button.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { UserCardComponent } from './components/user-card/usercard.component';
import { UsersComponent } from './components/user-card/users/user.component';
import { OnHoverDirective } from './directives/onhover.directive';
import { AddNewcomerComponent } from './pages/addnewcomer/addnewcomer.component';


@NgModule({
  declarations: [
    UserCardComponent,
    UsersComponent,
    ButtonComponent,
    LeftNavigationComponent,
    OnHoverDirective,
    AddNewcomerComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  exports: [
    UserCardComponent,
    UsersComponent,
    ButtonComponent,
    LeftNavigationComponent,
    AddNewcomerComponent,
    OnHoverDirective
  ]
})
export class CoreModule { }
