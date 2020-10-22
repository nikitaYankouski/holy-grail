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

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputComponent,
    BugdetShellComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
