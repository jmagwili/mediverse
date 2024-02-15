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
  mockData = [
    {
      id: 1,
      name: "Dr. Cona Grey",
      imageUrl: "../../../assets/images/profile.png",
      comment: "As healthcare professionals, we have a unique perspective on the potential benefits and risks associated with the legalization of marijuana and other drugs. From a medical standpoint, what are your thoughts on this controversial topic?",
      likeCount: 5,
    },
    {
      id: 2,
      name: "Dr. Liu Xin",
      imageUrl: "../../../assets/images/profile.png",
      comment: "It's an intriguing discussion indeed. While some argue that legalization could lead to increased access for medical purposes and potentially reduce criminal activity",
      likeCount: 8,
    },
    {
      id: 3,
      name: "Dr. Maria Dela Cruz",
      imageUrl: "../../../assets/images/profile.png",
      comment: "There's growing evidence suggesting the therapeutic benefits of marijuana, particularly in managing chronic pain, nausea, and certain neurological disorders.",
      likeCount: 3,
    },
    {
      id: 4,
      name: "Dr. Tailor Swift",
      imageUrl: "../../../assets/images/profile.png",
      comment: "it's essential to acknowledge the limitations and uncertainties surrounding its medical use.",
      likeCount: 10,
    },
    {
      id: 5,
      name: "Dr. Gariel Fernandez",
      imageUrl: "../../../assets/images/profile.png",
      comment: "we need stringent regulations in place to ensure safe usage and prevent misuse, especially among vulnerable populations like adolescents.",
      likeCount: 8,
    },
  ]

  sampleStructuredData = {
    name: "Budji",
    comment: "Ang pogi kooo"
  }
}
