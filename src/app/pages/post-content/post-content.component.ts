import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.css'
})
export class PostContentComponent {
  structuredData = {
    postType:"public",
    name: "Dr. John",
    email: "john@mediverse.com.ph",
    content: "I like hotdogs",
    category: ["dentistry","pediatrics"]
  }
}
