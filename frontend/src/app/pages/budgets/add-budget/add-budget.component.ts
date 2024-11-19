import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BudgetsService } from '../../../services/budget/budgets.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.css',
})
export class AddBudgetComponent {
  public budgetForm: any;
  categories: any = [];

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetsService,
    private dailogRef: MatDialogRef<AddBudgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data, "init")
    this.getAllCategories()
    if (this.data) {
      this.budgetForm = this.fb.group({
        categoryId: [this.data.categoryId._id || '', [Validators.required]],
        amount: [this.data.amount || '', [Validators.required]],
      });
    } else {
      // For 'Add' case, initialize form with empty fields
      this.budgetForm = this.fb.group({
        categoryId: ['', [Validators.required]],
        amount: ['', [Validators.required]],
      });
    }
  }

  getAllCategories() {
    this.budgetService.getCategories().subscribe({
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
    console.log("this.data", this.data);
    if (this.data && this.data._id) {
      return "Update Budget";
    }
    return "Add Budget";
  }

  onSubmit() {
    const data = {
      categoryId: this.budgetForm.get('categoryId')?.value,
      amount: this.budgetForm.get('amount')?.value,
    };

    if (this.data) {
      this.budgetService.updateBudget(data, this.data._id).subscribe({
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
      this.budgetService.addBudget(data).subscribe({
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
