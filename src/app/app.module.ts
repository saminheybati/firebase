import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {DataBaseService} from "../services/data-base.service";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import {FormsModule} from "@angular/forms";
import { SignInComponent } from './sign-in/sign-in.component';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { UserListComponent } from './user-list/user-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";

const fireBaseConfig = {
  apiKey: 'AIzaSyDWefPBJ3L7A5qYoQ4nkJNbTAasCW0OHZQ',
  authDomain: 'first-task-samin-default-rtdb.firebaseio.com',
  databaseURL: 'localhost:4200',
  projectId: 'bezkoder-firebase',
  storageBucket: 'first-task-samin-default-rtdb.firebaseio.com',
  messagingSenderId: 'xxx',
  appId: 'first-task-samin'
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserListComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    MatButtonModule
  ],
  providers: [DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
