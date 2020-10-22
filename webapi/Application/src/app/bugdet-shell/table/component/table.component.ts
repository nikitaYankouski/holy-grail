import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

import { BugdetShellService } from '../../bugdet-shell.service';
import { TableService } from '../services/table.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ViewOperation } from '../../view-operation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private _bank: number;

  get bank(): number {
    return this._bank;
  }
  @Input() set bank(value: number) {
    this._bank = value;
    this.inputBank();
  }

  private _operations: ViewOperation[];

  get operations(): ViewOperation[] {
    return this._operations;
  }
  set operations(value: ViewOperation[]) {
    this._operations = value;
  }

  dataSource = new MatTableDataSource<ViewOperation>(this.operations);
  
  @Output() operationsChart = new EventEmitter<ViewOperation[]>();

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'description',
    'timestamp',
    'cashIn',
    'cashOut',
    'balance'
  ]

  constructor(
    private service: TableService,
    private budgetApi: BugdetShellService,
  ) { }

  ngOnInit(): void { }

  getOperations() {
    this.budgetApi.getOperations().subscribe(operations => {
      this.operations = operations;
      this.refreshData();
    });
  }

  clickSort() {
    this.dataSource.sort = this.sort;
    this.dataSource.connect().subscribe(element => this.operations = element);
    this.refreshData();
  }

  balanceСalculation(asynOperationsTable: ViewOperation[]): ViewOperation[] {
    if ((typeof this.bank !== 'undefined') && (typeof this.bank !== "string")) {
      return this.budgetApi.balanceСalculation(asynOperationsTable, this.bank);
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
    this.operations.forEach((operation, idx) => {
      operation.id = idx + 1;
    });

    if (event.currentIndex !== event.previousIndex) {
      this.service.timeChange(this.operations, event.currentIndex);
      this.refreshData();
    }
  }

  refreshData() {
    this.balanceСalculation(this.operations);
    this.dataSource.data = this.operations;
    this.operationsChart.emit([...this.budgetApi.castNewObject(this.operations)]);
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