import { Component } from '@angular/core';
import { AvatarComponent } from '../../../components/avatar/avatar.component';
import { HeaderImageComponent } from '../../../components/header-image/header-image.component';

import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-practitioner',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent,
    HeaderImageComponent,
  ],
  templateUrl: './practitioner.component.html',
  styleUrl: './practitioner.component.css'
})
export class PractitionerComponent {

}
