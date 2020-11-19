import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashFlowComponent } from './bugdet-shell/cash-flow/cash-flow.component';
import { SettingsComponent } from './bugdet-shell/settings/settings.component';

const routes: Routes = [
  { path: 'cash-flow/:bank', component: CashFlowComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/cash-flow/0', pathMatch: 'full' }, // add cookie
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
