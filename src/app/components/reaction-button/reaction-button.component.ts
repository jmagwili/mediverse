import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-reaction-button',
  standalone: true,
  imports: [MatButtonModule, NgIconComponent, RouterLink],
  templateUrl: './reaction-button.component.html',
  styleUrl: './reaction-button.component.css',
  viewProviders: [provideIcons({ heroUsers })]
})
export class ReactionButtonComponent {
  clickCounter: number = 0;

  clickIncement(){
    this.clickCounter++;
  }

}
