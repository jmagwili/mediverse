import { Injectable } from '@angular/core';
import { collection, addDoc, query, getDocs, where } from "firebase/firestore"; 
import { db } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}

  async addNewUser(data:any){
    const docRef = await addDoc(collection(db, "users"), {
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

  async addNewPractitioner(data:any){
    const docRef = await addDoc(collection(db, "users"), {
      email: data.email,
      first_name: data.firstname,
      last_name: data.lastname,
      suffix: data.suffix,
      specialty: data.medicalSpeciality,
      affiliated_healthcare: data.affiliatedHealthcare,
      birth_date: data.birthdate,
      location: data.location,
      phone: data.phone,
      interests: data.tags,
    });
    console.log("Document written with ID: ", docRef.id);
  }

  async isEmailAvailable(email:string){
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty ){
      return true
    }else{
      return false
    }
  }
}
