import { Component, Input, OnInit, SimpleChange } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { from, Observable, Subscription } from "rxjs";

import { TableService } from "../services/table.service";
import { Operation } from "../operation"
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() bank: number;
  
  operations: Operation[];

  constructor(
    private operationsApi: TableService, 
    private calculateApi: CalculatorService
  ) { }

  ngOnInit(): void {
    this.getOperations();
  }

  ngOnChanges(changes: SimpleChange) {
    this.getOperationsCalc();
  }

  getOperations() {
    this.operationsApi.getOperations().subscribe(operations => {
      this.operations = operations;
    });
    
  }

  getOperationsCalc() {
    if ((typeof this.bank !== 'undefined') && (typeof this.bank !== 'string')) {
      this.operationsApi.getOperations().subscribe(operations => {
        this.operations = this.calculateApi.calculation(operations, this.bank);
      });
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
    this.operations.forEach((operation, idx) => {
      operation.id = idx + 1;
    });
    this.operations = this.calculateApi.calculation(this.operations, this.bank);
  }
}
