import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  // for now lang inaantok na ako 5 am na po aralin ko pa pano gamitin @input
  email: string = 'sige';
  password: string = 'na antok na ako';


  constructor(private router: Router) {}
  

  signUpWithGoogle() {
    //ikaw na bahala jos HAHHAHA
  }

  signUpWithFacebook() {
    //ikaw na bahala jos HAHHAHA
  }

  navigateToSignUp() {
    this.router.navigate(['/signup/user']);
  }
  navitageToFeed(){
    this.router.navigate(['/feed']);
  }
}
