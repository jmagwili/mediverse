import { Component } from '@angular/core';

import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.css'
})
export class PractitionerComponent {

}
