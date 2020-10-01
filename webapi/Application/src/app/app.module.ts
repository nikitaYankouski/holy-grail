import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';

import { BugdetShellComponent } from './bugdet-shell/bugdet-shell.component';
import { InputComponent } from './bugdet-shell/input/input.component';
import { TableComponent } from './bugdet-shell/table/component/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    InputComponent,
    BugdetShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
