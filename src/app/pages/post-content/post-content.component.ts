import { Component } from '@angular/core';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [],
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
