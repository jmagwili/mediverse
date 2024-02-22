import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, limit, QueryDocumentSnapshot,or } from "firebase/firestore";
import { db } from '../app.config';

interface User {
  interests?: string[]; // Define the properties of the user object
  following?: string[];
  location?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FeedService {

  constructor() { }

  // async getForYouFeed(email:string){
  //   let user: User | null = null; // Explicitly define the type of user
  //   const post:any = []

  //   const userQuery = query(
  //       collection(db, "users"), 
  //       where("email", "==", email)
  //   );

  //   const querySnapshot = await getDocs(userQuery);

  //   let userData: any; // Define a variable to capture user data

  //   await Promise.all(querySnapshot.docs.map(async (doc) => {
  //       userData = doc.data();
  //   }));

  //   user = userData as User; // Assign the user data to the user variable


  //   if(user && user.following && user.following.length > 0 && user.interests && user.location){
  //     const q1 = query(
  //       collection(db, "posts"), 
  //       where("category", "array-contains-any", user.interests),
  //       limit(10)  
  //     );

  //     const q2 = query(collection(db, "posts"), 
  //       where("email", "array-contains-any", user.following),
  //       limit(10)  
  //     );

  //     const [querySnapshot1, querySnapshot2] = await Promise.all([
  //       getDocs(q1),
  //       getDocs(q2),
  //     ]);

  //     const mergedResults: QueryDocumentSnapshot[] = [
  //       ...querySnapshot1.docs,
  //       ...querySnapshot2.docs
  //     ];

  //     const shuffledResults = this.shuffleArray(mergedResults)

  //     shuffledResults.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //     });

  //   }else if(user && user.interests){
      
  //     console.log(user.interests)

  //     const q1 = query(
  //       collection(db, "posts"), 
  //       where("category", "array-contains-any", user.interests),
  //       limit(10)  
  //     );

  //     const querySnapshot = await getDocs(q1)
     
  //     let index = 0
  //     querySnapshot.forEach((doc)=>{
  //       post.push(doc.data())
  //       post[index].id = doc.id
  //       index++
  //     })
      
  //     // console.log(post)
  //   }
  //   return post
  // }

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


    }else if(user && user.interests){

      const lowerCaseInterest = user.interests.map(interest => interest.toLowerCase());

      const q= query(collection(db,"posts"),
      or( where("category", "array-contains-any", lowerCaseInterest),
          where("user_location", "==", user.location)
        ),limit(20)
      )
      
      const querySnapshot = await getDocs(q)
      
      querySnapshot.forEach((doc)=>post.push(doc.data()))
    }
    
    return this.shuffleArray(post)
  }



  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
}
