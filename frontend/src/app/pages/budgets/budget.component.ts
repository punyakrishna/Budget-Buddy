import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { BudgetsService } from '../../services/budget/budgets.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
})
export class BudgetComponent implements OnInit {
  public dialogRef: any;
  data: any = [];

  constructor(
    private matDialog: MatDialog,
    private budgetService: BudgetsService
  ) { }

  ngOnInit(): void {
    this.getAllBudgets()
  }

  getAllBudgets() {
    this.budgetService.getBudgets().subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        this.data = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addBudget() {
    this.dialogRef = this.matDialog.open(AddBudgetComponent, {
      width: '350px',
      data: null,

    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.getAllBudgets()
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateBudget(data: any) {
    this.dialogRef = this.matDialog.open(AddBudgetComponent, {
      width: '350px',
      data: data,
    });
  }

  deleteBudget(budgetId: string) {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.budgetService.deleteBudget(budgetId).subscribe({
        next: (response) => {
          alert('Budget deleted successfully!');
          this.getAllBudgets(); // Refresh the budget list
        },
        error: (err) => {
          console.log(err, "errrrrrrrrrr")
          alert('Failed to delete budget. Please try again.');
        },
      });
    }
  }

  getSpentPercentage(budget: any): any {
    return (budget.totalExpense / budget.amount) * 100;
  }

  getBudgetCardClassName(budget: any): string {
    const percentage = this.getSpentPercentage(budget);
    if (percentage > 0 && percentage <= 60) {
      return 'green';
    } else if (percentage > 60 && percentage < 100) {
      return 'yellow';
    } else {
      return 'white';
    }
  }

  getBudgetCardDescription(budget: any): string {
    const percentage = this.getSpentPercentage(budget);
    if (percentage <= 60) {
      return `Your expenditure on ${budget.categoryId.name} is on track`;
    } else if (percentage > 60 && percentage < 100) {
      return 'You might be spending too much';
    } else {
      return `You have not spent on ${budget.categoryId.name} yet`;
    }
  }
}
