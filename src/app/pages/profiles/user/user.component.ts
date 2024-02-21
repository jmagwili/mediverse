import { Component, ViewEncapsulation } from '@angular/core';

import { HeaderComponent } from '../../../components/header/header.component';
import { AvatarComponent } from '../../../components/avatar/avatar.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent,
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userProfile = {
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    userName: 'Marc Justine',
    birthday: 'July 17, 2002',
    postCount: '12',
    followerCount: '696', 
    isFollowed: false,
  }

}
