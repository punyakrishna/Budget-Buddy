import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm: any;
  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
    });
  }

  onSubmitForm() {
    const data = {
      email: this.loginForm.get("email")?.value, password: this.loginForm.get("password")?.value
    }
    this.loginService.login(data).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        localStorage.setItem(
          'authToken',
          response?.authToken
        );
      },
      error: (error) => {
        console.error('Error:', error);
        alert(error.error.message)
      },
      complete: () => {
        console.log('Data fetch completed.');
        this.router.navigate(['/dashboard']);

      },
    });

    // localStorage.setItem(
    //   'authToken',
    //   'lkjhgfdsdfghjkl8765423456789kjhcxzxdfty8iytrewq2``1234567890oijhbv'
    // );
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
