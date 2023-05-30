import {Injectable} from '@angular/core';
import 'firebase/auth';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import 'firebase/auth';
import {GoogleAuthProvider} from 'firebase/auth';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  auth = getAuth();

  constructor(public afAuth: AngularFireAuth) {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        // console.log(error);
      });
  }





}
