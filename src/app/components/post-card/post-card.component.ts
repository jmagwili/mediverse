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

@Input() title = "Joshua Mark Magwili";
@Input() tag = "Dentist";
@Input() content = "Today, I had the privilege of meeting Mrs. Smith, who bravely underwent cataract surgery. Witnessing her joy and newfound clarity post-surgery reaffirmed why I love being an ophthalmologist. Here's to transformative moments that remind us of the profound impact we have on people's lives";

imageUrl = "../../../assets/images/profile.png";
}
