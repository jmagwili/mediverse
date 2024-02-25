import { Component,Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { PostService } from '../../service/post.service';
import { sample } from 'rxjs';

@Component({
  selector: 'app-write-comment',
  standalone: true,
  imports: 
  [
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    NgIconComponent
  ],
  viewProviders: [provideIcons({ heroUsers })],
  templateUrl: './write-comment.component.html',
  styleUrl: './write-comment.component.css',
})
export class WriteCommentComponent {
  @Input() data:any = {}
  
  imageUrl = "../../../assets/images/profile.png";
  userInput: string = '';
  userData:any = {}

  constructor(private postService:PostService) { }

  ngOnInit(){
    this.userData = JSON.parse(sessionStorage.getItem("user") as string)
  }

  clickedBTN() {
    const sampleStructuredData = {
      name: `${this.userData.first_name} ${this.userData.last_name}`,
      comment: this.userInput,
      profileImage: this.data.profile_image,
      postID: this.data.id,
      date: Date.now(),
      userID: this.userData.id,
      email: this.userData.email,
    };

    this.postService.addPublicComment(sampleStructuredData)

    // console.log("Sample Structured Data:", sampleStructuredData); // Log the structured data directly
  }
  // clickedBTN(){
  //   console.log("You've Clicked me")
  // }

  // sampleStructuredData = {
  //   name: "Budji",
  //   comment: "Ang pogi kooo"
  // }
}
