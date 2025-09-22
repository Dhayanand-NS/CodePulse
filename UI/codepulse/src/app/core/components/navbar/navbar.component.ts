import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/service/auth.service';
import { User } from '../../../features/auth/models/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user: User | undefined;
  isAdmin : boolean = false;
  constructor(private authService: AuthService,private router :Router) {}

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (Response) => {
        this.user = Response;
        console.log(Response);
      },
    });
    this.user = this.authService.GetUser();
  }
  OnLogout(): void{
    this.authService.Logout();
    this.router.navigateByUrl("/");

  }
}
