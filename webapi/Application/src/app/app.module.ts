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
import { BugdetShellComponent } from './bugdet-shell/bugdet-shell.component';
import { TableComponent } from './bugdet-shell/cash-flow/table/component/table.component';

import { ChartComponent } from './bugdet-shell/cash-flow/chart/component/chart.component';
import { FilterPanelComponent } from './bugdet-shell/cash-flow/filter-panel/filter-panel.component';
import { DatepickerComponent } from './bugdet-shell/cash-flow/filter-panel/datepicker/datepicker.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HeadPanelComponent } from './bugdet-shell/head-panel/head-panel.component';
import { SettingsComponent } from './bugdet-shell/settings/settings.component';
import { CashFlowComponent } from './bugdet-shell/cash-flow/cash-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    BugdetShellComponent,
    ChartComponent,
    FilterPanelComponent,
    DatepickerComponent,
    HeadPanelComponent,
    SettingsComponent,
    CashFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MaterialModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
