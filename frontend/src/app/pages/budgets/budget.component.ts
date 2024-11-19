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
  ) {}

  ngOnInit(): void {
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
    });
    this.dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // this.fetchData();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateBudget(data: any) {
    // this.bts.updateBudget(data.item, data.index);
    // this.fetchData();

    this.dialogRef = this.matDialog.open(AddBudgetComponent, {
      width: '450px',
      data: data,
    });
    // this.dialogRef.afterClosed().subscribe((result:boolean)=>{
    //   if(result===true){
    //     this.fetchData(0, this.pageSize);
    //   }
    // })
  }

  deleteBudget({ item, index }: { item: any; index: number }) {
    console.log('coming to delete', item);

    // if (confirm('Are you sure you want to delete this income?')) {
    //   this.bts.deleteBudget(item, index);
    //   this.fetchData();
    // }
  }

  getSpentPercentage(budget: any): any {
    return (budget.spent / budget.budgetSet) * 100;
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
      return `Your expenditure on ${budget.budgetType} is on track`;
    } else if (percentage > 60 && percentage < 100) {
      return 'You might be spending too much';
    } else {
      return `You have not spent on ${budget.budgetType} yet`;
    }
  }
}
