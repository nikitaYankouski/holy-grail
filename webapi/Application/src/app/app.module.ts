import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module'
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CashFlowShellComponent } from './cash-flow-shell/cash-flow-shell.component';
import { TableComponent } from './cash-flow-shell/budget/table/component/table.component';

import { ChartComponent } from './cash-flow-shell/budget/chart/component/chart.component';
import { FilterPanelComponent } from './cash-flow-shell/budget/filter-panel/filter-panel.component';

import { HeadPanelComponent } from './cash-flow-shell/head-panel/head-panel.component';
import { SettingsComponent } from './cash-flow-shell/settings/settings.component';
import { BudgetComponent } from './cash-flow-shell/budget/budget.component';
import { DatepickerDialogComponent } from './cash-flow-shell/budget/filter-panel/datepicker-dialog/datepicker-dialog.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { RenderDatepickerDirective } from './cash-flow-shell/budget/filter-panel/datepicker-dialog/render-datepicker.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CashFlowShellComponent,
    ChartComponent,
    FilterPanelComponent,
    HeadPanelComponent,
    SettingsComponent,
    BudgetComponent,
    DatepickerDialogComponent,
    RenderDatepickerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot()
  ],
  providers: [
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
