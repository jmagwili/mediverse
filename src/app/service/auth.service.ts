import { Injectable } from '@angular/core';
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  auth = getAuth();
  constructor(private router:Router) { }

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
}
