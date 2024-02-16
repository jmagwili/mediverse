import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor() { }

  async getForYouFeed(email:string){
    let user: object | null = null;
    
    const userQuery = query(collection(db, "users"), 
    where("email", "==", email),
    );
    const querySnapshot = await getDocs(userQuery);
    
    await Promise.all(querySnapshot.docs.map(async (doc) => {
      user = doc.data();
  }));

    console.log(user)

    // const q1 = query(collection(db, "posts"), 
    //   where("category", "in", interests),
    //   limit(10)  
    // );

    // const q2 = query(collection(db, "posts"), 
    // where("email", "in", interests),
    // limit(10)  
    // );

    // const querySnapshot = await getDocs(q1);
    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });
  }
}
