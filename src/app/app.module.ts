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
import {SignInComponent} from './sign-in/sign-in.component';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {UserListComponent} from './user-list/user-list.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {getAnalytics} from "@angular/fire/analytics";
import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import { CustomizedDialogComponent } from './sign-in/customized-dialog/customized-dialog.component';
import {AccessLevelsComponent} from "./access-levels/access-levels.component";
import {MatCheckboxModule} from "@angular/material/checkbox";

const fireBaseConfig = {
  apiKey: "AIzaSyDWefPBJ3L7A5qYoQ4nkJNbTAasCW0OHZQ",
  authDomain: "first-task-samin.firebaseapp.com",
  databaseURL: "https://first-task-samin-default-rtdb.firebaseio.com",
  projectId: "first-task-samin",
  storageBucket: "first-task-samin.appspot.com",
  messagingSenderId: "1045667251530",
  appId: "1:1045667251530:web:e0c672ee524d19500f2db3",
  measurementId: "G-QF2XWXEEN7"
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserListComponent,
    FileUploadComponent,
    CustomizedDialogComponent,
    AccessLevelsComponent
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
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
