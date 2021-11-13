import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfilesComponent } from './components/profile-card/profiles/profiles.component';
import { ButtonComponent } from './components/button/button.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { OnHoverDirective } from './directives/onhover.directive';
import { AddNewcomerComponent } from './pages/addnewcomer/addnewcomer.component';
import { AuthModule } from 'projects/app/src/app/auth/auth.module';
import { AngularFireModule} from '@angular/fire/compat'
import { provideFirebaseApp, initializeApp }  from '@angular/fire/app';
import { getAuth, provideAuth }  from '@angular/fire/auth';
import { getFirestore, provideFirestore }  from '@angular/fire/firestore';
import { getStorage, provideStorage }  from '@angular/fire/storage';
import { environment } from './../../../app/src/environments/environment';

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileCardComponent,
    ProfilesComponent,
    ButtonComponent,
    LeftNavigationComponent,
    OnHoverDirective,
    AddNewcomerComponent,
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  exports: [
    HeaderComponent,
    ProfileCardComponent,
    ProfilesComponent,
    ButtonComponent,
    LeftNavigationComponent,
    AddNewcomerComponent,
    OnHoverDirective
  ]
})
export class CoreModule { }
