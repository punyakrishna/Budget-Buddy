import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { LoginComponent } from './pages/login/login.component';
import { BudgetComponent } from './pages/budgets/budget.component';
import { SettingsComponent } from './pages/setting/settings.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import this
import { AuthInterceptor } from './services/interceptors/auth.service';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, DashboardComponent, ExpenseComponent, LoginComponent, BudgetComponent, SettingsComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,

  ],
  providers: [provideAnimationsAsync(), {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true // Allow multiple interceptors
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
