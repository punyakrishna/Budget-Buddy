import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  public dialogRef: any;

  constructor(private router: Router) { }

  navigationList = [
    {
      navName: 'Dashboard',
      path: 'dashboard',
      icon: 'assets/image/ic_dashboard.svg',
    },
    {
      navName: 'Expenses',
      path: 'expenses',
      icon: 'assets/image/ic_expense.svg',
    },
    {
      navName: 'Budget',
      path: 'budget',
      icon: 'assets/image/ic_budget.svg',
    },
    {
      navName: 'Settings',
      path: 'settings',
      icon: 'assets/image/ic_setting.svg',
    },
  ];

  handleLogoutUser() {
    // this.dialogRef = this.matDialog.open(LogoutDialogBodyComponent, {
    //   width: '350px',
    //   height: '250px',
    //   panelClass: 'custom-dialog-container',
    // });
    // this.dialogRef.afterClosed().subscribe((result: boolean) => {
    //   if (result === true) {
    //     localStorage.removeItem('authToken');
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  handleNavigation(path: string) {
    switch (path) {
      case 'dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'expenses':
        this.router.navigate(['/expenses']);
        break;
      case 'budget':
        this.router.navigate(['/budget']);
        break;
      case 'settings':
        this.router.navigate(['settings']);
        break;
      default:
        console.error('Invalid routes');
    }
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
