import { Component, ViewEncapsulation } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIcon,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LandingHeaderComponent {

  title: string = 'MediVerse';

}
