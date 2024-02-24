import { Component } from '@angular/core';

import { LandingHeaderComponent } from '../../components/landing-header/landing-header.component';
import { LandingHomeComponent } from '../../components/landing-home/landing-home.component';
import { LandingPartnersComponent } from '../../components/landing-partners/landing-partners.component';
import { LandingToolsComponent } from '../../components/landing-tools/landing-tools.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingHeaderComponent,
    LandingHomeComponent,
    LandingPartnersComponent,
    LandingToolsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
