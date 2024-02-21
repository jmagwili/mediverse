import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ReactionButtonComponent } from '../reaction-button/reaction-button.component';

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

imageUrl = "../../../assets/images/profile.png";
}
