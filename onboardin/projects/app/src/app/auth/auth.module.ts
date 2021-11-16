import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { AngularFireModule} from '@angular/fire/compat'
import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
import { getAuth, provideAuth }  from '@angular/fire/auth';
import { getFirestore, provideFirestore }  from '@angular/fire/firestore';
import { getStorage, provideStorage }  from '@angular/fire/storage';
import { SignupComponent } from './components/signup/signup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthComponent } from './components/auth/auth.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent },
];


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, 
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ]
})
export class AuthModule { }
