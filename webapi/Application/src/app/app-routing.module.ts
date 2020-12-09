import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BudgetComponent } from './cash-flow-shell/budget/budget.component';
import { SettingsComponent } from './cash-flow-shell/settings/settings.component';

const routes: Routes = [
  { path: 'budget/:bank', component: BudgetComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/budget/0', pathMatch: 'full' }, // add cookie
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
