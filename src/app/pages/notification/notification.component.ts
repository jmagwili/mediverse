import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {MatCardModule, MatCardSmImage} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

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

  notificationData:any=[]
  userData:any={}
  private subscription: Subscription | null = null;

  constructor(private userService:UserService, ){}

  async ngOnInit(){
    this.userData = JSON.parse(sessionStorage.getItem("user") as string)
    this.notificationData = await this.userService.getNotifications(this.userData.id)
    // this.userService.getUnreadNotificationObservable(this.userData.email)
    // this.subscription = this.userService.unreadNotifications().subscribe((notifications)=>{
    //   this.notificationData = notifications
    //   console.log(notifications)
    // })
  }

  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }
}
