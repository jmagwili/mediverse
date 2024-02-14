import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync()]
};

const firebaseConfig = {
  apiKey: "AIzaSyDASHLEUPFjwPL0Dj7jIJkNpWYQgcMxpas",
  authDomain: "mediverse-9851d.firebaseapp.com",
  databaseURL: "https://mediverse-9851d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mediverse-9851d",
  storageBucket: "mediverse-9851d.appspot.com",
  messagingSenderId: "1059855477794",
  appId: "1:1059855477794:web:b187079a568ff657ff2e7b",
  measurementId: "G-P2TBY0M3ZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
