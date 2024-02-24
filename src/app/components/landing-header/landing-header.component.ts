import { Component } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIcon,
  ],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent {

  title: string = 'MediVerse';

}
