import { Component, OnInit } from '@angular/core';
import { ViewOperation } from './view-operation';

@Component({
  selector: 'app-bugdet-shell',
  templateUrl: './bugdet-shell.component.html',
  styleUrls: ['./bugdet-shell.component.scss']
})
export class BugdetShellComponent implements OnInit {
  bankBuffer: number;

  operationsBuffer: ViewOperation[];

  constructor() { }

  ngOnInit(): void {
  }

  refreshBankBuffer(bank: number) {
    this.bankBuffer = bank;
  }

  refreshOperations(operations: ViewOperation[]) {
    this.operationsBuffer = operations;
  }
}
