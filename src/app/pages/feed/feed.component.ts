import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {

}
