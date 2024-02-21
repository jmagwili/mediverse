import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reaction-button',
  standalone: true,
  imports: [MatButtonModule, NgIconComponent, RouterLink],
  templateUrl: './reaction-button.component.html',
  styleUrl: './reaction-button.component.css',
  viewProviders: [provideIcons({ heroUsers })]
})
export class ReactionButtonComponent {
  @Input() data:any = {}
  totalLikes: number = 0;
  isLiked: boolean = false

  constructor(private router:Router){}
  
  ngOnInit(){
    this.totalLikes = this.data.like_count
  }

  clickIncement(){
    if(!this.isLiked){
      this.totalLikes++
      this.isLiked = true
    } else{
      this.totalLikes--
      this.isLiked = false
    } 
  }

  commentClick(){
    this.router.navigate([`/post/${this.data.id}`])
  }

}
