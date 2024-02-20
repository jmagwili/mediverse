import { Component } from '@angular/core';
import { AvatarComponent } from '../../../components/avatar/avatar.component';

import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.css'
})
export class PractitionerComponent {

}
