import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { BugdetShellComponent } from './bugdet-shell/bugdet-shell.component';
import { InputComponent } from './bugdet-shell/input/input.component';
import { TableComponent } from './bugdet-shell/table/component/table.component';
import { ChartComponent } from './bugdet-shell/chart/component/chart.component';

import { DatePipe } from '@angular/common';
import { FilterPanelComponent } from './bugdet-shell/filter-panel/filter-panel.component';
//import { DatepickerComponent } from './bugdet-shell/filter-panel/datepicker/datepicker.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputComponent,
    BugdetShellComponent,
    ChartComponent,
    FilterPanelComponent
    // DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MaterialModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
