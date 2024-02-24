import { Component } from '@angular/core';

import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { LandingHomeComponent } from '../../components/landing-home/landing-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingHeaderComponent,
    LandingHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
