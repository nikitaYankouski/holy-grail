import { Component, OnInit } from '@angular/core';
import { Operation } from './table/operation';

@Component({
  selector: 'app-bugdet-shell',
  templateUrl: './bugdet-shell.component.html',
  styleUrls: ['./bugdet-shell.component.scss']
})
export class BugdetShellComponent implements OnInit {
  bankBuffer: number;

  operationsBuffer: Operation[];

  constructor() { }

  ngOnInit(): void {
  }

  refreshBankBuffer(bank: number) {
    this.bankBuffer = bank;
  }

  refreshOperations(operations: Operation[]) {
    this.operationsBuffer = operations;
  }
}
