import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {MatCardModule, MatCardSmImage} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    HeaderComponent, 
    MatCardModule,
    MatCardSmImage, 
    MatButtonModule,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  image = "../../../assets/images/profile.png";
  
  // action = ["liked","commented on", "shared", "answered"]
  // postType = ["post","repost","question","tips","forum"]
  date: number = Date.now();
  sample = [
    {
      id:1,
      name: "Dr. Gabriel Fernandez",
      action: "liked",
      postType: "post",
    },
    {
      id: 2,
      name: "Dr. asas Fernandez",
      action: "asasa",
      postType: "possast",
    },
    {
      id: 3,
      name: "Dr. gfdfs fdsf",
      action: "asasa",
      postType: "possast",
    },
  ]
}
