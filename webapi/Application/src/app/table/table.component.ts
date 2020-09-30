import { Component, OnInit } from "@angular/core";
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { Subscription } from "rxjs";

import { TableService } from "./table.service";
import { Operation } from "./operation"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  operations: Operation[];

  constructor(private operationsApi: TableService) { }

  ngOnInit(): void {
    this.getOperations();
  }

  getOperations() {
    this.operationsApi.getOperations().subscribe(operations => {
      this.operations = operations;
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.operations, event.previousIndex, event.currentIndex);
    this.operations.forEach((operation, idx) => {
      operation.id = idx + 1;
    });
  }
}
