import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { UserService } from '../../service/user.service';

// import { Subscription } from 'rxjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  notificationCount = 0;
  userData:any = {}
  // private subscription: Subscription | null = null;
  notificationData:any = []
  filteredNotifications:any = []

  constructor(private userService:UserService, private router:Router){}

  async ngOnInit(){
    this.userData = JSON.parse(sessionStorage.getItem("user") as string)
    this.notificationData = await this.userService.getNotifications(this.userData.id)
    this.filterNotifications(this.notificationData)
    console.log("from header", this.notificationData)

    // this.userService.getNotificationObservable(this.userData.email)
    // this.subscription = this.userService.notifications().subscribe((notifications)=>{
    //   this.notificationData.push(notifications)
    //   console.log("from header", this.notificationData)
    // })
  }

  filterNotifications(notifications:Array<any>){
    this.notificationCount = notifications.filter((notifications)=>notifications.is_Read == false).length
  }

  notificationClick(){
    this.router.navigate(["/feed/notification"])
    console.log("im clicked")
  }
  
}
