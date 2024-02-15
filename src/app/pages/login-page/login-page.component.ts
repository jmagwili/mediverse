import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import {FormsModule} from '@angular/forms';

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
    MatIconModule,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  hide = true;
  signUpWithGoogle;

  constructor(private router: Router, authService:AuthService) {    
    this.signUpWithGoogle = authService.signUpWithGoogle;
  }
  

  


}
