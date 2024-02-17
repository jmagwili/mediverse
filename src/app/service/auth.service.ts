import { Injectable } from '@angular/core';
import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
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

  async signInWithEmail(email:string, password:string){
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        this.router.navigate(["/feed"])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  }

async signUpWithEmail(email:string, password:string){
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("Successfully created an account")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
}

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
        console.log(user?.providerData[0].providerId)
        isLoggedIn = !!user;
        resolve();
      });
    });
  
    return isLoggedIn;
  }

  async getProvider() {
    let provider:string | undefined;
  
    await new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        provider = user?.providerData[0].providerId
        resolve();
      });
    });
  
    return provider;
  }
  
}