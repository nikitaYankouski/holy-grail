import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

import { TableService } from '../services/table.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Operation } from '../../../operation';
import { ViewOperationTable } from '../view-operation-table';
import { DatePipe } from '@angular/common';
import { BudgetService } from '../../budget.service';
import {DateRange} from '../../date-range';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  private _bank = 100;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
    this.inputBank();
  }

  private _operations: Operation[];

  get operations(): Operation[] {
    return this._operations;
  }
  set operations(value: Operation[]) {
    this._operations = value;
  }

  private _filterDateRange: DateRange
    = BudgetService.getFirstAndLastDateOfCurrentMonth(new Date());

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  @Input() set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
  }

  dataSource = new MatTableDataSource<ViewOperationTable>();

  @Output() operationsChart = new EventEmitter<Operation[]>();

  @ViewChild(MatSort) sort: MatSort;

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

  getOperations(): void {
    this.budgetService.getOperations();
    this.budgetService.dataOutput.subscribe(operations => {
      this.operations = operations;
      this.refreshData();
    });
  }

  sortData(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(elements => {
      this.operations = this.tableService.castToOperations(elements);
    });

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
    this.operations.forEach((operation, idx) => {
      operation.id = idx + 1;
    });

    if (event.currentIndex !== event.previousIndex) {
      this.tableService.timeChange(this.operations, event.currentIndex);
      this.refreshData();
    }
  }

  refreshData(): void {
    this.calculateBalance(this.operations);
    this.dataSource.data = this.tableService.castToViewModel(this.operations);
    this.operationsChart.emit([...this.operations]);
  }

  inputBank(): void {
    if (typeof this.operations === 'undefined') {
      this.getOperations();
    }
    else {
      this.refreshData();
    }
  }
}
