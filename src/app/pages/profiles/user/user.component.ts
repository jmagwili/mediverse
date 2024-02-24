import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../../components/header/header.component';
import { HeaderImageComponent } from '../../../components/header-image/header-image.component';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { PostCardComponent } from '../../../components/post-card/post-card.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    HeaderImageComponent,
    AvatarComponent,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    PostCardComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userProfile = {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    userName: 'Marc Justine',
    dateJoined: {
      month: 'January',
      day: '13',
      year: '2013'
  },
    postCount: 12,
    followerCount: 696, 
    followingCount: 324,
    isFollowed: false,
  }
  email=""
  data:any={}

  constructor(private userService:UserService, private route:ActivatedRoute){}

  async ngOnInit(){
    this.email = this.route.snapshot.paramMap.get('email') as string;
    this.data = await this.userService.getUser(this.email)
    console.log(this.data)
  }

  toggleFollow() {
    if (this.userProfile.isFollowed) {
      // If currently followed, unfollow and decrement follower count
      this.userProfile.isFollowed = false;
      this.userProfile.followerCount--;
    } else {
      // If currently not followed, follow and increment follower count
      this.userProfile.isFollowed = true;
      this.userProfile.followerCount++;
    }
    console.log("User follow status: " + this.userProfile.isFollowed);
    console.log("New follower count: " + this.userProfile.followerCount);
  }

}
