import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  user: any = null;

  ngOnInit(): void {
    // Retrieve user details from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      console.error('No user data found. Redirecting to login.');
      // Redirect to login if no user data found
      // Use Angular Router if needed
    }
  }
}
