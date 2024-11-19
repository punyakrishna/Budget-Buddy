import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public signupForm!: FormGroup;
  public genders = ['Female', 'Male', 'Others']; // Gender dropdown options

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
        ],
      ],
      lastName: [
        '', // Optional field
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email, // Validate email format
        ],
      ],
      gender: [
        '', // Optional
        [Validators.pattern(/^(Female|Male|Others)?$/)], // Valid options
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Signup Data:', this.signupForm.value);

      // Submit form to the backend
      // this.loginService.signup(this.signupForm.value).subscribe({
      //   next: (response: any) => {
      //     console.log('Signup successful:', response);
      //     alert('Signup successful!');
      //     this.router.navigate(['/login']); // Redirect to login after signup
      //   },
      //   error: (error) => {
      //     console.error('Signup error:', error);
      //     alert('Signup failed. Please try again.');
      //   },
      // });
    } else {
      alert('Please correct the form errors before submitting.');
    }
  }
}
