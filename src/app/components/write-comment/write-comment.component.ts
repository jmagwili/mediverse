import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-write-comment',
  standalone: true,
  imports: 
  [
    MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    MatButtonModule, 
    MatIconModule,
    NgIconComponent
  ],
  viewProviders: [provideIcons({ heroUsers })],
  templateUrl: './write-comment.component.html',
  styleUrl: './write-comment.component.css',
})
export class WriteCommentComponent {
  imageUrl = "../../../assets/images/profile.png";

  sampleStructuredData = {
    name: "Budji",
    comment: "Ang pogi kooo"
  }
}
