import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugdetShellComponent } from './bugdet-shell/bugdet-shell.component';

const routes: Routes = [
  { path: 'budget', component: BugdetShellComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/budget' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
