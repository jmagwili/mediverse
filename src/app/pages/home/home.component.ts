import { Component } from '@angular/core';

import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { LandingHomeComponent } from '../../components/landing-home/landing-home.component';
import { LandingPartnersComponent } from '../../components/landing-partners/landing-partners.component';
import { LandingToolsComponent } from '../../components/landing-tools/landing-tools.component';
import { LandingGoalsComponent } from '../../components/landing-goals/landing-goals.component';
import { LandingSolutionsComponent } from '../../components/landing-solutions/landing-solutions.component';
import { LandingCommunityComponent } from '../../components/landing-community/landing-community.component';
import { LandingStartComponent } from '../../components/landing-start/landing-start.component';
import { LandingEnderComponent } from '../../components/landing-ender/landing-ender.component';
import { LandingFooterComponent } from '../../components/landing-footer/landing-footer.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingHeaderComponent,
    LandingHomeComponent,
    LandingPartnersComponent,
    LandingToolsComponent,
    LandingGoalsComponent,
    LandingSolutionsComponent,
    LandingCommunityComponent,
    LandingStartComponent,
    LandingEnderComponent,
    LandingFooterComponent,
    ScrollToTopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
