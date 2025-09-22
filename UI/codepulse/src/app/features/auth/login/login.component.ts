import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../models/login-model';
import { AuthService } from '../service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model:LoginRequest;
  constructor(private authService : AuthService, private cookieService : CookieService, private router :Router){
    this.model={
      email :'',
      password:''
    };
  }

  OnFormSubmit(){
  this.authService.loginSubmit(this.model).subscribe({
    next : (Response)=>{
      //Save the JWT in the cookie
      this.cookieService.set('Authorization',`Bearer ${Response.token}`,undefined,'/',undefined,true,'Strict');

      // ser User
      this.authService.setUser({
        email:Response.email,
        roles : Response.roles
      })
       

      //After successful login redirect to the home page
        this.router.navigateByUrl("");

    }
  })
  }

}
