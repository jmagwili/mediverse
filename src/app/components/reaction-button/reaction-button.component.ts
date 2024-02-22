import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';


@Component({
  selector: 'app-reaction-button',
  standalone: true,
  imports: [MatButtonModule, NgIconComponent, RouterLink],
  templateUrl: './reaction-button.component.html',
  styleUrl: './reaction-button.component.css',
  viewProviders: [provideIcons({ heroUsers })]
})
export class ReactionButtonComponent {
  @Input() data:any = {}
  totalLikes: number = 0;
  isLiked: boolean = false
  user:any = {}

  constructor(private router:Router, private postService:PostService){}
  
  ngOnInit(){
    this.totalLikes = this.data.like_count
    this.isLiked = this.data.isLiked
    this.user = JSON.parse(sessionStorage.getItem("user") as string)
  }

  clickIncement(){
    const data = {postID:this.data.id, email: this.user.email}

    if(!this.isLiked){
      this.totalLikes++
      this.postService.likePost(data)
      this.isLiked = true

    } else{
      this.totalLikes--
      this.postService.unlikePost(data)
      this.isLiked = false
    } 
  }

  commentClick(){
    this.router.navigate([`/post/${this.data.id}`])
  }

}
