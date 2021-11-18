import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './cash-flow-shell/budget/budget.component';
import { SettingsComponent } from './cash-flow-shell/settings/settings.component';
import { AuthShellComponent } from './auth-shell/auth-shell.component';
import { LoginPageComponent } from './auth-shell/login-page/login-page.component';
import { SignupPageComponent } from './auth-shell/signup-page/signup-page.component';

const routes: Routes = [
  { path: 'budget/:bank', component: BudgetComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'base', component: AuthShellComponent },
  { path: 'base/login', component: LoginPageComponent },
  { path: 'base/sign', component: SignupPageComponent },
  { path: '', redirectTo: 'base', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
