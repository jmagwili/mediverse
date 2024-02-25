import { Component, ViewEncapsulation } from '@angular/core';

import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-landing-partners',
  standalone: true,
  imports: [
    MatListModule,
  ],
  templateUrl: './landing-partners.component.html',
  styleUrl: './landing-partners.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LandingPartnersComponent {

}
