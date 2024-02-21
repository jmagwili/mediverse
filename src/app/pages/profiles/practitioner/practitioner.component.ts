import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { HeaderImageComponent } from '../../../components/header-image/header-image.component';
import { HeaderComponent } from '../../../components/header/header.component';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent,
    HeaderImageComponent,
    MatButton,
    MatIcon
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.css'
})
export class PractitionerComponent {

  userProfile = {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    userName: 'Marc Justine',
    tag: "Practitioner",
    dateJoined: {
      month: 'January',
      day: '13',
      year: '2013'
    },
    postCount: '12',
    followerCount: 696, 
    isFollowed: false,
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
