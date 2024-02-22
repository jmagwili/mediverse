import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NavComponent } from '../../components/nav/nav.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { FeedService } from '../../service/feed.service';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    HeaderComponent,
    NavComponent,
    PostCardComponent,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent {
  currentTitle = "Eliz Marie Manalo"
  currentTag = "Nutritionist"
  currentContent = "As healthcare professionals, we have a unique perspective on the potential benefits and risks associated with the legalization of marijuana and other drugs. From a medical standpoint, what are your thoughts on this controversial topic?"
  isLoading = true
  feed:any = []

  constructor(private feedService:FeedService, private authService:AuthService, private userService:UserService){}

  async ngOnInit(){
    const user:any = await this.authService.getUserData()
  
    if(user && user?.email){
      sessionStorage.setItem("user", JSON.stringify(await this.userService.getUser(user.email)))
      this.feed = await this.feedService.getForYouFeed(user?.email)
      
      this.isLoading = false
      console.log("sdasd",this.feed)    
    }   
  }
}
