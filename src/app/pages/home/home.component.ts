import { Component } from '@angular/core';

import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingHeaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
