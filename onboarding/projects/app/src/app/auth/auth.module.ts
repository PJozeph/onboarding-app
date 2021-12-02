import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthPinComponent } from './components/auth-pin/auth-pin.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: AuthPinComponent },
];

@NgModule({
  declarations: [
    SignupComponent,
    AuthComponent,
    AuthPinComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, 
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ]
})
export class AuthModule { }
