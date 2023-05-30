import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service.service";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {MatDialog} from "@angular/material/dialog";
import {CustomizedDialogComponent} from "./customized-dialog/customized-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: any
  password: any

  constructor(public authService: AuthServiceService,
              protected _Router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  logIn() {
    if (this.email && this.password !== '') {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log('sign in shod ')
          this._Router.navigateByUrl('/access-levels')
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      this.dialog.open(CustomizedDialogComponent)
    }

  }

  sigUpWithGoogle() {
    if (this.email && this.password !== '') {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      this.dialog.open(CustomizedDialogComponent)
    }

  }

  openDialog() {
    this.dialog.open(CustomizedDialogComponent)
  }
}
