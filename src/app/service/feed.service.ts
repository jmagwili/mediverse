import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, limit, QueryDocumentSnapshot,or, getDoc, doc } from "firebase/firestore";
import { db } from '../app.config';

interface User {
  interests?: string[]; // Define the properties of the user object
  following?: string[];
  location?: string;
  liked_posts?: Array<string>;
}

@Injectable({
  providedIn: 'root'
})

export class FeedService {

  constructor() { }

  async getForYouFeed(email:string){
    let user: User | null = null; // Explicitly define the type of user
    let userData: any;
    let post:any = []

    const userQuery = query(
        collection(db, "users"), 
        where("email", "==", email)
    );

    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => userData = doc.data())

    user = userData as User; // Assign the user data to the user variable

    if(user && user.following && user.following.length > 0 && user.interests && user.location){
      const lowerCaseInterest = user.interests.map(interest => interest.toLowerCase());

      const q= query(collection(db,"posts"),
        or( where("category", "array-contains-any", lowerCaseInterest),
            where("user_location", "==", user.location),
            where("email", "in", user.following),
          ),limit(20)
        )
      
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc)=>{
        const isLiked = user?.liked_posts?.includes(doc.id)
        
        post.push({
          ...doc.data(),
          id: doc.id,
          isLiked
        })
      })

    }else if(user && user.interests){
      const lowerCaseInterest = user.interests.map(interest => interest.toLowerCase());

      const q= query(collection(db,"posts"),
      or( where("category", "array-contains-any", lowerCaseInterest),
          where("user_location", "==", user.location)
        ),limit(20)
      )
      
      const querySnapshot = await getDocs(q)
      
      querySnapshot.forEach((doc)=>{
        const isLiked = user?.liked_posts?.includes(doc.id)

        post.push({
          ...doc.data(),
          isLiked,
          id: doc.id,
        })

      })
    }

    if(post.length < 10){
      
      if(post.length > 0){
      
        const IDList = post.map((data:any)=>data.id)
        console.log("list",IDList)
  
        const q = query(collection(db,"posts"), limit(15))
        const querySnapshot = await getDocs(q)
        
        const filteredPosts = []
        
        querySnapshot.forEach((doc)=>{
          if(!IDList.includes(doc.id)){
            const isLiked = user?.liked_posts?.includes(doc.id)

            post.push({
              ...doc.data(),
              id: doc.id,
              isLiked
            })
          }        
        })

      }else{
        const q = query(collection(db, "posts"), limit(15))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc)=>{
          const isLiked = user?.liked_posts?.includes(doc.id)

          post.push({
            ...doc.data(),
            id: doc.id,
            isLiked
          })
        })
      }
    }
    
    return this.shuffleArray(post)
  }

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

}
