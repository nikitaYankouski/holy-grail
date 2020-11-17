import { Component, OnInit } from '@angular/core';
import { Model } from './model';
import { DateRange } from './date-range';
import { BugdetShellService } from './bugdet-shell.service';

@Component({
  selector: 'app-bugdet-shell',
  templateUrl: './bugdet-shell.component.html',
  styleUrls: ['./bugdet-shell.component.scss']
})
export class BugdetShellComponent implements OnInit {
  bankBuffer: number;

  operationsBuffer: Model[];

  filterDateRangeBuffer: DateRange;

  timeLimitBugdet: DateRange;

  constructor(private bugdetShellService: BugdetShellService) { }

  ngOnInit(): void { }

  refreshFilterDateRange(filterDateRange: DateRange) {
    this.filterDateRangeBuffer = filterDateRange;
  }

  refreshBankBuffer(bank: number) {
    this.bankBuffer = bank;
  }

  refreshOperations(operations: Model[]) {
    this.operationsBuffer = operations;
    this.timeLimitBugdet = this.bugdetShellService.calculateMinMaxOperations(operations);
  }
}
