import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header-image',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
  ],
  templateUrl: './header-image.component.html',
  styleUrl: './header-image.component.css'
})
export class HeaderImageComponent {
  file: string = '';

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file; 
    }
  }
}
