import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

import { TableService } from '../services/table.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Operation } from '../../../../operation';
import { ViewOperationTable } from '../view-operation-table';
import { DatePipe } from '@angular/common';
import { BudgetService } from '../../../budget.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  private _bank;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
    this.refreshDataInTable();
  }

  private _operations: Operation[];

  get operations(): Operation[] {
    return this._operations;
  }

  @Input() set operations(value: Operation[]) {
    this._operations = value;
    this.refreshDataInTable();
  }

  @ViewChild(MatSort) sort: MatSort;

  @Output() updatedOperation = new EventEmitter<Operation>();

  dataSource = new MatTableDataSource<ViewOperationTable>();

  displayedColumns: string[] = [
    'description',
    'timestamp',
    'cashIn',
    'cashOut',
    'balance'
  ];

  constructor(
    private tableService: TableService,
    private budgetService: BudgetService,
    public datePipe: DatePipe
  ) { }

  refreshDataInTable(): void {
    if (typeof this.operations !== 'undefined') {
      this.calculateBalance(this.operations);
      this.dataSource.data = this.tableService.castToViewModel(this.operations);
    }
  }

  sortData(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(elements => {
      this.operations = this.tableService.castToOperations(elements);
    });

    /*this.refreshData();*/
    this.calculateBalance(this.operations);
    this.dataSource.data = this.tableService.castToViewModel(this.operations);
  }

  calculateBalance(operations: Operation[]): Operation[] {
    if ((typeof this.bank !== 'undefined') && (typeof this.bank !== 'string')) {
      return this.budgetService.calculateBalance(operations, this.bank);
    }
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
    if (event.currentIndex !== event.previousIndex) {
      this.tableService.timeChange(this.operations, event.currentIndex);
      this.refreshDataInTable();
      this.updatedOperation.emit(this.operations[event.currentIndex]);
    }
  }
}