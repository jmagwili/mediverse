import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ReactionButtonComponent } from '../reaction-button/reaction-button.component';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports:
   [ 
    ReactionButtonComponent, 
    MatCardModule, 
    MatButtonModule, 
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

@Input() data:any = {};

constructor(private userService:UserService, private router:Router){}

async nameClick(){
  this.router.navigate([`/profile/user/${this.data.email}`])
}

imageUrl = "../../../assets/images/profile.png";
}
