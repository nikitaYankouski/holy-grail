import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

import { BugdetShellService } from '../../bugdet-shell.service';
import { TableService } from '../services/table.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Model } from '../../model';
import { ViewModelTable } from '../view-model-table';
import { DatePipe } from '@angular/common';

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

  private _operations: Model[];

  get operations(): Model[] {
    return this._operations;
  }
  set operations(value: Model[]) {
    this._operations = value;
  }

  dataSource = new MatTableDataSource<Model>();
  
  @Output() operationsChart = new EventEmitter<Model[]>();

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
    public datePipe: DatePipe
  ) { }

  ngOnInit(): void { }

  getOperations() {
    this.budgetApi.getOperations().subscribe(operations => {
      this.operations = operations;
      this.refreshData();
    });
  }

  sortData() {
    this.dataSource.sort = this.sort;

    this.dataSource.connect().subscribe(elements => {
      this.operations = elements
    });
    
    this.balanceСalculation(this.operations);
    this.dataSource.data = this.operations; 
  }

  balanceСalculation(asynOperationsTable: Model[]): Model[] {
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