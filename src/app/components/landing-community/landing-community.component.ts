import { Component } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-landing-community',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCard,
  ],
  templateUrl: './landing-community.component.html',
  styleUrl: './landing-community.component.css'
})
export class LandingCommunityComponent {

}
