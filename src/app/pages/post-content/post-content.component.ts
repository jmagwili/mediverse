import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
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

  sampleImage = "../../../assets/images/profile.png";
}
