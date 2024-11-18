import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public loginForm: any;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmitForm() {
    localStorage.setItem(
      'auth-token',
      'lkjhgfdsdfghjkl8765423456789kjhcxzxdfty8iytrewq2``1234567890oijhbv'
    );
    this.router.navigate(['/dashboard']);
  }
}
