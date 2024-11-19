import { Component, Inject } from '@angular/core';
import { ExpenseService } from '../../../services/expense/expense.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  public expenseForm: any;
  categories: any = [];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private dailogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
    if (this.data) {
      this.expenseForm = this.fb.group({
        categoryId: [this.data.categoryId._id || '', [Validators.required]],
        amount: [this.data.amount || '', [Validators.required]],
        title: [this.data.title || '', [Validators.required]],
        description: [this.data.description || '', [Validators.required]],
      });
    } else {
      this.expenseForm = this.fb.group({
        categoryId: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
      });
    }
  }

  getAllCategories() {
    this.expenseService.getCategories().subscribe({
      next: (response: any) => {
        console.log('Response:', response.data);
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  getButtonText() {
    if (this.data && this.data._id) {
      return "Update Expense";
    }
    return "Add Expense";
  }

  onSubmit() {
    const data = {
      categoryId: this.expenseForm.get('categoryId')?.value,
      amount: this.expenseForm.get('amount')?.value,
      title: this.expenseForm.get('title')?.value,
      description: this.expenseForm.get('description')?.value,
    };

    if (this.data) {
      this.expenseService.updateExpense(data, this.data._id).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error:', error);
          alert("something went wrong")
        },
        complete: () => {
          this.dailogRef.close(true)
        },
      });
    } else {
      this.expenseService.addExpense(data).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
        },
        error: (error) => {
          console.error('Error:', error);
          alert("something went wrong")
        },
        complete: () => {
          this.dailogRef.close(true)
        },
      });
    }
  }
}
