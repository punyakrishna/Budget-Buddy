import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   canActivate: [authGuard],
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: DashboardComponent,
  //     },
  //     // {
  //     //   path: 'expenses',
  //     //   component: ExpensesComponent,
  //     // },
  //     // {
  //     //   path: 'budget',
  //     //   component: BudgetComponent,
  //     // },
  //     // {
  //     //   path: 'settings',
  //     //   component: SettingsComponent,
  //     // },
  //   ],
  // },
  {
    path: '*',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
