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
      first_name: data.name,
      profile_image: data.profileImage || null,
      like_count: 0,
      likes:[],
      image_upload:[],
      comment_count: 0,
      comments:[],
      repost_count: 0,
      reposts:[],
      user_location: data.location || null,
      post_type: "normal",
      category: data.category,
      content: data.content,
      date: data.date,
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
      const currentLikes = postData["likes"]

      // Increment the like_count value
      const updatedLikeCount = currentLikeCount + 1;
      const updatedLikes = currentLikes.concat(data.email)
  
      // Update the document with the new like_count value
      await updateDoc(postRef, {
        like_count: updatedLikeCount,
        likes: updatedLikes,
      });
  
      console.log("Like count incremented successfully.");
    } else {
      console.log("Document does not exist.");
    }
  }

  async unlikePost(data: any) {
    const postRef = doc(db, "posts", data.postID);
  
    // Fetch the current document data
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const currentLikeCount = postData["like_count"]; // Ensure like_count exists and handle potential null value
      const currentLikes = postData["likes"]

      // Increment the like_count value
      const updatedLikeCount = currentLikeCount - 1;
      const updatedLikes = currentLikes.filter((id:string)=> id !== data.email)
  
      // Update the document with the new like_count value
      await updateDoc(postRef, {
        like_count: updatedLikeCount,
        likes: updatedLikes,
      });
  
      console.log("Like count decremented successfully.");
    } else {
      console.log("Document does not exist.");
    }
  }


  async addPublicComment(data: any) {
    console.log(data)
    const postRef = doc(db, "posts", data.postID);
    const postSnap = await getDoc(postRef);
    
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const currentCommentCount = postData["comment_count"]; // Ensure like_count exists and handle potential null value
      const currentComments = postData["comments"];
  
      
      // // Increment the like_count value
      const updatedCommentCount = currentCommentCount + 1;
      const updatedComments = currentComments.concat({
        name: data.name,
        profile_image: data.profileImage,
        comment: data.comment,
        like_count: 0,
        likes: [],
        replies:[],
        date: data.date,
      });
      
      // Update the document with the new like_count value
      await updateDoc(postRef, {
        comment_count: updatedCommentCount,
        comments: updatedComments,
      });
  
      console.log("Comment posted successfully.");
    } else {
      console.log("Document does not exist.");
    }
  }

  async repostContent(data:any){

  }

  async getPost(id:string){
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    
    let postData:any = postSnap.data()
    postData.id = postSnap.id

    return postData
  }

}
