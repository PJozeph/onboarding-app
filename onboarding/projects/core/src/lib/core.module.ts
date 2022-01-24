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
import { OnHoverDirective } from './directives/onhover.directive';
import { ScrollBottomDirective } from './directives/scroll-bottom.directive';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { InputComponent } from './dialog/input/input.component';
import { FormsModule } from '@angular/forms';
import { InputDialogComponent } from './dialog/input/input-dialog/input-dialog.component';
import { MessageDialogComponent } from './dialog/message/message-dialog/message-dialog.component';


@NgModule({
  declarations: [
    ButtonComponent,
    LeftNavigationComponent,
    OnHoverDirective,
    ComingSoonComponent,
    ScrollBottomDirective,
    InputComponent,
    InputDialogComponent,
    MessageDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  exports: [
    ButtonComponent,
    LeftNavigationComponent,
    OnHoverDirective,
    ComingSoonComponent,
    ScrollBottomDirective,
    InputComponent,
    MessageDialogComponent
  ]
})
export class CoreModule { }
