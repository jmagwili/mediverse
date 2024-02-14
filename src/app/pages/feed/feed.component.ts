import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavComponent } from '../../components/nav/nav.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    PostCardComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  @Input() currentTitle = "Eliz Marie Manalo"
  @Input() currentTag = "Nutritionist"
  @Input() currentContent = "As healthcare professionals, we have a unique perspective on the potential benefits and risks associated with the legalization of marijuana and other drugs. From a medical standpoint, what are your thoughts on this controversial topic?"
}
