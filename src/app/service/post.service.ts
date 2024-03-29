import { Injectable } from '@angular/core';
import { collection, addDoc, doc, updateDoc, getDoc, query, where, getDocs } from "firebase/firestore"; 
import { db } from '../app.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  async addPublicPost(data:any){
    const postRef = await addDoc(collection(db, "posts"), {
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
      specialty: data.specialty
    })
      .then(async (ref)=>{
        const userRef = doc(db, "users", data.userID);
        const docSnap = await getDoc(userRef);
    
        const userData:any = {
          ...docSnap.data()
        }
    
        let updatedPosts = [...userData.posts]
        updatedPosts.push(ref.id)

        let updatedPostCount = userData.post_count + 1

        await updateDoc(userRef,{
          posts: updatedPosts,
          post_count: updatedPostCount
        })
       
        console.log("Document written with ID: ", ref.id);
      })   
  }

  async likePost(data: any) {
    const postRef = doc(db, "posts", data.postID);
  
    // Fetch the current document data
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      const currentLikeCount = postData["like_count"]; 
      const currentLikes = postData["likes"]
      const postEmail = postData["email"]
 
      // Update user data
      const userQuery = query(collection(db,"users"), where("email", "==", data.email))
      const querySnapshot = await getDocs(userQuery)
      let userData:any

      querySnapshot.forEach((doc)=>{
        userData = {
          ...doc.data(),
          id: doc.id
        }
      })

      const updatedLikedPosts = userData.liked_posts.concat(data.postID)
      const updatedNotifications = [...userData.notifications]
      
      await updateDoc(doc(db, "users", userData.id), {
        liked_posts: updatedLikedPosts,
        notifications: updatedNotifications
      })

      .then(async ()=>{
        // Increment the like_count value
        const updatedLikeCount = currentLikeCount + 1;
        const updatedLikes = [...currentLikes]
        updatedLikes.push(data.email)
    
        // Update the document with the new like_count value
        await updateDoc(postRef, {
          like_count: updatedLikeCount,
          likes: updatedLikes,
        })

        // Notify other user that someone liked their post
        .then(async ()=>{
          const postUserQuery = query(collection(db, "users"), where("email", "==", postEmail))
          const postUserSnapshot = await getDocs(postUserQuery)
          let postUserData:any = {}

          postUserSnapshot.forEach((doc)=> postUserData = {
            ...doc.data(),
            id: doc.id
          })

          let updatedNotifications = [...postUserData.notifications]

          if(postUserData.email !== data.email){
            updatedNotifications.push({
              name: `${userData.first_name} ${userData.last_name}`,
              action: "liked",
              post_type: "post",
              post_ID: data.postID,
              date: Date.now(),
              image_url: postUserData.profile_img,
              is_Read: false,
              id: uuidv4(),
            })
          }

          await updateDoc(doc(db, "users", postUserData.id),{
            notifications: updatedNotifications
          })

        })
      })
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

      // Update user data
      const userQuery = query(collection(db,"users"), where("email", "==", data.email))
      const querySnapshot = await getDocs(userQuery)
      let userData:any

      querySnapshot.forEach((doc)=>{
        userData = {
          ...doc.data(),
          id: doc.id
        }
      })

      const updatedLikedPosts = userData.liked_posts.filter((id:string)=>id !== data.postID)
      
      await updateDoc(doc(db, "users", userData.id), {
        liked_posts: updatedLikedPosts 
      })
        .then(async ()=>{
          // Increment the like_count value
          const updatedLikeCount = currentLikeCount - 1;
          const updatedLikes = currentLikes.filter((id:string)=> id !== data.email)
      
          // Update the document with the new like_count value
          await updateDoc(postRef, {
            like_count: updatedLikeCount,
            likes: updatedLikes,
          });
        })

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
      const postEmail = postData["email"]
  
      
      // // Increment the like_count value
      const updatedCommentCount = currentCommentCount + 1;
      const updatedComments = [...currentComments]
      updatedComments.push({
        name: data.name,
        profile_image: data.profileImage,
        comment: data.comment,
        like_count: 0,
        likes: [],
        replies:[],
        date: data.date,
      })
      
      // Update the document with the new like_count value
      await updateDoc(postRef, {
        comment_count: updatedCommentCount,
        comments: updatedComments,
      })

      .then(async ()=>{
        const userQuery = query(collection(db, "users"), where("email", "==", postEmail))
        const userQuerySnapshot = await getDocs(userQuery)
        let userData:any
        
        userQuerySnapshot.forEach((doc)=>userData = {
          ...doc.data(),
          id: doc.id,
        })

        if(data.email !== postEmail){
          const updatedNotifications = [...userData.notifications, {
            name: data.name,
            action: "commented",
            post_type: "post",
            post_ID: data.postID,
            date: Date.now(),
            image_url: data.profileImage,
            is_Read: false,
            id: uuidv4(),
          }]

          await updateDoc(doc(db, "users", userData.id), {
            notifications: updatedNotifications
          })
        }
      })

      console.log("Comment posted successfully.");
    } else {
      console.log("Document does not exist.");
    }
  }

  async repostContent(data:any){

  }

  async getPost(id:string, email:string){
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    let user:any

    const q = query(collection(db,"users"), where("email", "==", email))
    const snapshot = await getDocs(q)

    snapshot.forEach((doc)=>user=doc.data())
  
    let postData:any = postSnap.data()
    postData.id = postSnap.id

    if(user.liked_posts.includes(postData.id)){
      postData.isLiked = true
    }else{
      postData.isLiked = false
    }

    return postData
  }

}
