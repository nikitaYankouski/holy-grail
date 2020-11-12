import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule, 
    MatDatepickerModule,
    MatFormFieldModule
  ],
  exports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule, 
    MatDatepickerModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
