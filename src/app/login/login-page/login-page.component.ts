import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule], // Import ReactiveFormsModule for standalone components
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'] // Corrected to styleUrls
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  errorMessage?: String;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {} // Inject FormBuilder service

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email field with validators
      password: ['', [Validators.required]] // Password field with validators
    });
  }

  // Getter for form controls
  get fc() {
    return this.loginForm.controls;
  }
  submit() {
    this.isSubmitted = true;
    this.errorMessage = ''; // Reset error message on submit

    if (this.loginForm.invalid) return;

    const email = this.fc['email'].value;
    const password = this.fc['password'].value;

    this.userService.login(email, password).subscribe({
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response));
        alert('Login Successful');
        this.router.navigate(['/dashboard']);

        // Handle successful login (e.g., navigate to dashboard)
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
        // Handle error (e.g., show error message)
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }
}
  
