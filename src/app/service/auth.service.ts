import { Injectable } from '@angular/core';
import { 
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { Router } from '@angular/router';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../app.config';
import { auth } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router:Router) { }

  signUpWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider)
      .then(async (result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user.email;

        const q = query(collection(db, "users"), where("email", "==", result.user.email));
        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty ){
          this.router.navigate(["/new-account"])
        }else{
          this.router.navigate(["/feed"])
        }

      }).catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage)
      });
  }

  async signOut(){
    signOut(auth).then(() => {
      this.router.navigate(["/"])
    }).catch((error) => {
      console.log(error)
      return error
    });
  }

  async isLoggedIn() {
    let isLoggedIn = false;
  
    await new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        isLoggedIn = !!user;
        resolve();
      });
    });
  
    return isLoggedIn;
  }
  
}