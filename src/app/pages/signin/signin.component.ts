import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from "../../service/auth.service"

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  providers: [
    AuthService,
  ],
})
export class SigninComponent {
  auth;
  signUpWithGoogle;
  
  constructor(private router:Router, private authService:AuthService){
    this.signUpWithGoogle = authService.signUpWithGoogle
    this.auth = authService.auth
  }
}