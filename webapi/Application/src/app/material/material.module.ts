import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,

    MatNativeDateModule,
    MatDatepickerModule,

    MatDialogModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
