import { Component, OnInit } from '@angular/core';
import { Model } from './model';

@Component({
  selector: 'app-bugdet-shell',
  templateUrl: './bugdet-shell.component.html',
  styleUrls: ['./bugdet-shell.component.scss']
})
export class BugdetShellComponent implements OnInit {
  bankBuffer: number;

  operationsBuffer: Model[];

  constructor() { }

  ngOnInit(): void {
  }

  refreshBankBuffer(bank: number) {
    this.bankBuffer = bank;
  }

  refreshOperations(operations: Model[]) {
    this.operationsBuffer = operations;
  }
}
