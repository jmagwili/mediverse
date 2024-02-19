import { Injectable } from '@angular/core';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  async addPublicPost(data:any){
    const docRef = await addDoc(collection(db, "posts"), {
      email: data.email,
      first_name: data.firstName,
      profile_image: data.profileImage,
      like_count: 0,
      likes:[],
      image_upload:[],
      comment_count: 0,
      comments:[],
      repost_count: 0,
      reposts:[],
      user_location: data.userLocation,
    });
    console.log("Document written with ID: ", docRef.id);
  }

}
