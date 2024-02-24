import { Component } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-landing-community',
  standalone: true,
  imports: [
    MatGridListModule,
  ],
  templateUrl: './landing-community.component.html',
  styleUrl: './landing-community.component.css'
})
export class LandingCommunityComponent {

}
