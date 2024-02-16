import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule, MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipListbox } from '@angular/material/chips';

@Component({
  selector: 'app-post-content',
  standalone: true,
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './post-content.component.html',
  styleUrl: './post-content.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PostContentComponent {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  structuredData = {
    postType:"public",
    name: "Dr. John",
    email: "john@mediverse.com.ph",
    content: "",
    category: ["dentistry","pediatrics"]
  }

  removeCategory(category: string) {
    const index = this.structuredData.category.indexOf(category);
    if (index >= 0) {
      this.structuredData.category.splice(index, 1);
    }
  }

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.structuredData.category.push(value);
    }
    event.chipInput!.clear();
  }

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.structuredData.content = target.value;
  }

  printInput() {
    console.log(this.structuredData);
  }

  sampleImage = "../../../assets/images/profile.png";
}
