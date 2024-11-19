import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.dashboardService.getData().subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        this.dashboardData = response.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Data fetch completed.');
      },
    });
  }

}
