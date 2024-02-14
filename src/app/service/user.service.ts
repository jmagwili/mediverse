import { Injectable } from '@angular/core';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}

  async addNewUser(data:any){
    const docRef = await addDoc(collection(db, "users"), {
      username: data.username,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      suffix: data.suffix,
      birth_date: data.birthDate,
      location: data.location,
      phone: data.phone,
      interests: data.interests,
    });
    console.log("Document written with ID: ", docRef.id);
  }
}
