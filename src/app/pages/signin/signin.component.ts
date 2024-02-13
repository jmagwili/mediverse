import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private router: Router) {}

  signUpWithGoogle() {
    //ikaw na bahala jos HAHHAHA
  }

  signUpWithFacebook() {
    //ikaw na bahala jos HAHHAHA
  }

}
