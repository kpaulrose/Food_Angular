import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
registrationForm!: FormGroup;
isSubmitted = false;
constructor(private formBuilder: FormBuilder,private userService:UserService){
  this.registrationForm = this.formBuilder.group({
    name:   ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    password:['', [Validators.minLength(6),Validators.required]]
  })
}


get fc() {
  return this.registrationForm.controls;
}

submit(){
  this.isSubmitted = true;
  const email = this.fc['email'].value;
    const password = this.fc['password'].value;
    const name = this.fc['name'].value;
    const address = this.fc['address'].value;
  this.userService.register(name,email,address,password).subscribe({
    next: (response) => {
      alert("Registration is sucessfull")
    },
    error: (error) =>{
      if (error.status === 400) {
        alert("Registration failed: User already exists.");
      } else if (error.status === 500) {
        alert("Registration failed: Server error. Please try again later.");
      } else {
        alert("Registration failed: Unexpected error. Please try again.");
      }
    },
    complete: () =>{

    }
  })
}

}