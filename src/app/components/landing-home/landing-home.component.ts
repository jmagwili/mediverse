import { Component, ViewEncapsulation } from '@angular/core';

import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-landing-home',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LandingHomeComponent {

}
