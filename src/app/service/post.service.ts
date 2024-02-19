import { Injectable } from '@angular/core';
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore"; 
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
      post_type: "normal"
    });
    console.log("Document written with ID: ", docRef.id);
  }

  async likePost(data: any) {
    const postRef = doc(db, "posts", data.postID);
  
    // Fetch the current document data
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const currentLikeCount = postData["like_count"]; // Ensure like_count exists and handle potential null value
  
      // Increment the like_count value
      const updatedLikeCount = currentLikeCount + 1;
  
      // Update the document with the new like_count value
      await updateDoc(postRef, {
        like_count: updatedLikeCount
      });
  
      console.log("Like count incremented successfully.");
    } else {
      console.log("Document does not exist.");
    }
  }

  async unLikePost(data:any){

  }

  async addPublicComment(data:any){

  }

  async repostContent(data:any){

  }

}
