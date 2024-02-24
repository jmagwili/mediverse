import { Injectable } from '@angular/core';
import { collection, addDoc, query, getDocs, where, doc, getDoc } from "firebase/firestore"; 
import { db } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}

  async addNewUser(data:any){
    const q = query(collection(db, "users"), where("email", "==", data.email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
      const docRef = await addDoc(collection(db, "users"), {
        email: data.email,
        first_name: data.firstname,
        last_name: data.lastname,
        suffix: data.suffix,
        birth_date: data.birthdate,
        location: data.location,
        phone: data.phone,
        interests: data.tags,
        profile_img: data.profileImg || "",
        following: [],
        followers: [],
        posts: [],
        account_type: "user",
        liked_posts: [],
        notifications: [],
        post_count: 0,
        followers_count: 0,
        following_count: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    }

  }

  async addNewPractitioner(data:any){
    const q = query(collection(db, "users"), where("email", "==", data.email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
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
        account_type: "practitioner",
        liked_posts: [],
        notifications: [],
        post_count: 0,
        followers_count: 0,
        following_count: 0,
      });
      console.log("Document written with ID: ", docRef.id);
    }else{
      console.log("email not available")
    }
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

  async getUser(email:string){
    let user
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=> {
      user = {
        ...doc.data(),
        id: doc.id,
      } 
    })

    return user
  }

  async getPosts(id:string){
    const userRef = await getDoc(doc(db,"users",id))
    const userData:any = {...userRef.data()}

    const q = query(collection(db,"posts"), where("__name__", "in", userData.posts))
    const querySnapshot = await getDocs(q)

    const posts:any = []
    querySnapshot.forEach((doc)=>posts.push(doc.data()))

    return posts
  }
}
