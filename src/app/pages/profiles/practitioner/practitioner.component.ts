import { Component, ViewEncapsulation } from '@angular/core';

import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { HeaderImageComponent } from '../../../components/header-image/header-image.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { PostCardComponent } from '../../../components/post-card/post-card.component';

import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent,
    HeaderImageComponent,
    MatButton,
    MatIcon,
    MatTabsModule,
    PostCardComponent,
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.css'
})
export class PractitionerComponent {

  practitionerProfile = {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    practitionerName: 'Dr. Ana Santiago',
    tag: "Practitioner",
    dateJoined: {
      month: 'January',
      day: '13',
      year: '2013'
    },
    postCount: 17,
    followerCount: 5234, 
    followingCount: 324,
    isFollowed: false,
  }

  toggleFollow() {
    if (this.practitionerProfile.isFollowed) {
      // If currently followed, unfollow and decrement follower count
      this.practitionerProfile.isFollowed = false;
      this.practitionerProfile.followerCount--;
    } else {
      // If currently not followed, follow and increment follower count
      this.practitionerProfile.isFollowed = true;
      this.practitionerProfile.followerCount++;
    }
    console.log("practitioner follow status: " + this.practitionerProfile.isFollowed);
    console.log("New follower count: " + this.practitionerProfile.followerCount);
  }

}
