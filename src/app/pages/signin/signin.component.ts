import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  auth = getAuth();

  constructor(private router:Router){}
  
  signUpWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider)
      .then((result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        this.router.navigate(["/feed"])
        console.log(user)
      }).catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage)
      });
  }

  // signUpWithFacebook() {
  //   signInWithPopup(this.auth, new FacebookAuthProvider)
  // .then((result) => {
  //   const user = result.user;
  //   const credential = FacebookAuthProvider.credentialFromResult(result);
  //   const accessToken = credential?.accessToken;
  //   console.log(user)
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   const email = error.customData.email;
  //   const credential = FacebookAuthProvider.credentialFromError(error);
  //   console.log(errorMessage)
  //   // ...
  // });
  // }

}
