import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { BudgetsService } from '../../../services/budget/budgets.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.css',
})
export class AddBudgetComponent {
  public budgetForm: any;
  categories: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private budgetService: BudgetsService
  ) {}

  ngOnInit(): void {
    this.budgetService.getCategories().subscribe({
      next: (response: any) => {
        console.log('Response:', response.data);
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    this.budgetForm = this.fb.group({
      categoryId: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  onSubmitForm() {
    const data = {
      categoryId: this.budgetForm.get('categoryId')?.value,
      amount: this.budgetForm.get('amount')?.value,
    };
    // this.loginService.login(data).subscribe({
    //   next: (response: any) => {
    //     console.log('Response:', response);
    //     localStorage.setItem('authToken', response?.authToken);
    //   },
    //   error: (error) => {
    //     console.error('Error:', error);
    //   },
    //   complete: () => {
    //     console.log('Data fetch completed.');
    //     this.router.navigate(['/dashboard']);
    //   },
    // });

    // localStorage.setItem(
    //   'authToken',
    //   'lkjhgfdsdfghjkl8765423456789kjhcxzxdfty8iytrewq2``1234567890oijhbv'
    // );
  }

  onSubmit() {}
}
