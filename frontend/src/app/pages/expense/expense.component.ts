import { Component, OnInit } from '@angular/core';
import { AddExpenseComponent } from './addExpense/add-expense/add-expense.component';
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
  ) {}

  ngOnInit(): void {
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
      width: '350px',
    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // this.fetchData();
      }
    });
  }

  updateIncome(data: any) {}

  deleteIncome(data: any) {}
}
