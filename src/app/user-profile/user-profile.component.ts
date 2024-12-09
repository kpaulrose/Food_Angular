import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent,FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  user: any = null;
  isEditMode: boolean = false;
  constructor(private userService: UserService){

  }

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

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }
  saveProfile(): void {
    // Send the updated user data to the UserService for backend update
    this.userService.update(this.user.id,this.user.name, this.user.email, this.user.address, this.user.password).subscribe({
      next: (response) => {
        // Handle successful response (you can update the UI, show a success message, etc.)
        alert('Profile updated successfully');
        this.isEditMode = false; // Turn off edit mode
        // Optionally update localStorage with the new user data
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      error: (error) => {
        if (error.status === 400 && error.error?.message === 'The email address is already in use by another account.') {
          alert('The email address is already in use by another account. Please choose a different email.');
        } else if (error.status === 404) {
          alert('User not found. Please try again.');
        } else {
          // Generic error message for other cases
          console.error('Error updating profile', error);
          alert('An error occurred while updating the profile. Please try again later.');
        }
      },
      complete: () => {
        // This callback is optional and will be called when the observable completes.
        console.log('Profile update process completed');
      }
    });
  }
  
 

  
}
