import { Component, OnInit } from '@angular/core';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css',
})
export class ExpenseComponent implements OnInit {
  columns: any = [
    {
      id: 1,
      label: 'Category',
    },
    {
      id: 2,
      label: 'Title',
    },
    {
      id: 3,
      label: 'Description',
    },
    {
      id: 4,
      label: 'Amount Spent',
    },
  ];

  expennseData: any = [];
  public dialogRef: any;

  constructor(
    private matDialog: MatDialog,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.getAllExpenses()
  }

  getAllExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        this.expennseData = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  addExpense() {
    this.dialogRef = this.matDialog.open(AddExpenseComponent, {
      width: '450px',
    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.getAllExpenses()
      }
    });
  }

  updateExpense(data: any) {
    this.dialogRef = this.matDialog.open(AddExpenseComponent, {
      width: '450px',
      data: data,
    });
  }

  deleteExpense(expenseId: string) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: (response) => {
          alert('Expense deleted successfully!');
          this.getAllExpenses();
        },
        error: (err) => {
          console.log(err, "errrrrrrrrrr")
          alert('Failed to delete expense. Please try again.');
        },
      });
    }
  }
}
