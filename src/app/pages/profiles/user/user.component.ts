import { Component } from '@angular/core';

import { HeaderComponent } from '../../../components/header/header.component';
import { AvatarComponent } from '../../../components/avatar/avatar.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    AvatarComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
