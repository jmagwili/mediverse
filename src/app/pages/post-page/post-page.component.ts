import { Component } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [HeaderComponent ,PostCardComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.css'
})
export class PostPageComponent {

}
