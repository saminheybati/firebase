import {Injectable} from '@angular/core';
import 'firebase/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  auth = getAuth();

  constructor(public afAuth: AngularFireAuth,
              protected _Router: Router,) {

  }

  getAllUsers(){

  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
        this._Router.navigateByUrl('/panel')

      })
      .catch((error) => {
        // console.log(error);
      });
  }



}
