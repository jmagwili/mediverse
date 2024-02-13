import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: 
  [
    MatCardModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatFormFieldModule, 
    MatInputModule, 
    RouterLink, 
    MatIconModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  
  email: string = '';
  password: string = '';

  
  hide = true;

  constructor(private router: Router) {}
  

  signUpWithGoogle() {
    //ikaw na bahala jos HAHHAHA
  }

  signUpWithFacebook() {
    //ikaw na bahala jos HAHHAHA
  }

}
