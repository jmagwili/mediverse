import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, limit, QueryDocumentSnapshot } from "firebase/firestore";
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

  async getForYouFeed(email:string){
    let user: User | null = null; // Explicitly define the type of user

    const userQuery = query(
        collection(db, "users"), 
        where("email", "==", email)
    );

    const querySnapshot = await getDocs(userQuery);

    let userData: any; // Define a variable to capture user data

    await Promise.all(querySnapshot.docs.map(async (doc) => {
        userData = doc.data();
    }));

    user = userData as User; // Assign the user data to the user variable


    if(user && user.following && user.interests && user.location){
      const q1 = query(
        collection(db, "posts"), 
        where("category", "array-contains-any", user.interests),
        limit(10)  
      );

      const q2 = query(collection(db, "posts"), 
        where("email", "array-contains-any", user.following),
        limit(10)  
      );

      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      const mergedResults: QueryDocumentSnapshot[] = [
        ...querySnapshot1.docs,
        ...querySnapshot2.docs
      ];

      const shuffledResults = this.shuffleArray(mergedResults)

      shuffledResults.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

    }else if(user && user.interests){
      const q1 = query(
        collection(db, "posts"), 
        where("category", "array-contains-any", user.interests),
        limit(10)  
      );

      const querySnapshot = await getDocs(q1)
      
      const post:Array<object> = []

      querySnapshot.forEach((doc)=>{
        post.push(doc.data())
      })
      
      console.log(post)
    }
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
}
