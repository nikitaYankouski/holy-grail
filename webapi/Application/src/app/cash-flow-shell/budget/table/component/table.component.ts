import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

import { TableService } from '../services/table.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Operations } from '../../../operations';
import { ViewModelTable } from '../view-model-table';
import { DatePipe } from '@angular/common';
import { BudgetService } from '../../budget.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private _bank: number = 100;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
    this.inputBank();
  }

  private _operations: Operations[];

  get operations(): Operations[] {
    return this._operations;
  }
  set operations(value: Operations[]) {
    this._operations = value;
  }

  dataSource = new MatTableDataSource<ViewModelTable>();

  @Output() operationsChart = new EventEmitter<Operations[]>();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'description',
    'timestamp',
    'cashIn',
    'cashOut',
    'balance'
  ]

  constructor(
    private tableService: TableService,
    private cashFlowService: BudgetService,
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  getOperations() {
    this.cashFlowService.getOperations();
    this.cashFlowService.dataString.subscribe(operations => {
      this.operations = operations;
      this.refreshData();
    });
  }

  sortData() {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(elements => {
      this.operations = this.tableService.castToOperations(elements);
    });

    this.calculateBalance(this.operations);
    this.dataSource.data = this.tableService.castToViewModel(this.operations);
  }

  calculateBalance(operations: Operations[]): Operations[] {
    if ((typeof this.bank !== 'undefined') && (typeof this.bank !== "string")) {
      return this.cashFlowService.calculateBalance(operations, this.bank);
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
    this.operations.forEach((operation, idx) => {
      operation.id = idx + 1;
    });

    if (event.currentIndex !== event.previousIndex) {
      this.tableService.timeChange(this.operations, event.currentIndex);
      this.refreshData();
    }
  }

  refreshData() {
    this.calculateBalance(this.operations);
    this.dataSource.data = this.tableService.castToViewModel(this.operations);
    this.operationsChart.emit([...this.cashFlowService.castNewObject(this.operations)]);
  }

  inputBank() {
    if (typeof this.operations === 'undefined') {
      this.getOperations();
    }
    else {
      this.refreshData();
    }
  }
}
