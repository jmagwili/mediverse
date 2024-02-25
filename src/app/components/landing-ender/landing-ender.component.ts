import { Component } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-ender',
  standalone: true,
  imports: [
    MatButton,
    RouterModule,
  ],
  templateUrl: './landing-ender.component.html',
  styleUrl: './landing-ender.component.css'
})
export class LandingEnderComponent {

}
