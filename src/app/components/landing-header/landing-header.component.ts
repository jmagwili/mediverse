import { Component, ViewEncapsulation } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LandingHeaderComponent {

  title: string = 'MediVerse';

}
