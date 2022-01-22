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
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { CashFlowShellComponent } from './cash-flow-shell/cash-flow-shell.component';
import { TableComponent } from './cash-flow-shell/budget/views/table/component/table.component';

import { ChartComponent } from './cash-flow-shell/budget/views/chart/component/chart.component';
import { FilterPanelComponent } from './cash-flow-shell/budget/filter-panel/filter-panel.component';

import { HeadPanelComponent } from './cash-flow-shell/head-panel/head-panel.component';
import { SettingsComponent } from './cash-flow-shell/settings/settings.component';
import { BudgetComponent } from './cash-flow-shell/budget/budget.component';
import { DatepickerDialogComponent } from './cash-flow-shell/budget/filter-panel/datepicker-dialog/datepicker-dialog.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { RenderDatepickerDirective } from './cash-flow-shell/budget/filter-panel/datepicker-dialog/render-datepicker.directive';
import { ViewsComponent } from './cash-flow-shell/budget/views/views.component';
import { authInterceptorProviders } from './_helper/auth.interceptor';
import { LoginPageComponent } from './auth-shell/login-page/login-page.component';
import { SignupPageComponent } from './auth-shell/signup-page/signup-page.component';
import { AuthShellComponent } from './auth-shell/auth-shell.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditoperationDialogComponent } from './cash-flow-shell/budget/views/table/component/editoperation-dialog/editoperation-dialog.component';
import { AddoperationDialogComponent } from './cash-flow-shell/budget/views/table/component/addoperation-dialog/addoperation-dialog.component';

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
    RenderDatepickerDirective,
    ViewsComponent,
    LoginPageComponent,
    SignupPageComponent,
    AuthShellComponent,
    EditoperationDialogComponent,
    AddoperationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MatCardModule,
    MatRadioModule,
    MaterialModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    NgbModule
  ],
  providers: [
    DatePipe,
    CookieService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
