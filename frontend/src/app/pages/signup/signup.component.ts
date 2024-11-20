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
          Validators.minLength(3),
        ],
      ],
      lastName: [
        '',
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],
      // gender: [
      //   '', 
      //   [Validators.pattern(/^(Female|Male|Others)?$/)], 
      // ],
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

      this.loginService.signup(this.signupForm.value).subscribe({
        next: () => {
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error);
          alert('Signup failed. Please try again.');
        },
      });
    } else {
      alert('Please correct the form errors before submitting.');
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
