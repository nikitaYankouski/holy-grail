import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module'
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { BugdetShellComponent } from './bugdet-shell/bugdet-shell.component';
import { InputComponent } from './bugdet-shell/input/input.component';
import { TableComponent } from './bugdet-shell/table/component/table.component';

import { ChartComponent } from './bugdet-shell/chart/component/chart.component';
import { FilterPanelComponent } from './bugdet-shell/filter-panel/filter-panel.component';
import { DatepickerComponent } from './bugdet-shell/filter-panel/datepicker/datepicker.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputComponent,
    BugdetShellComponent,
    ChartComponent,
    FilterPanelComponent,
    DatepickerComponent
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
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
