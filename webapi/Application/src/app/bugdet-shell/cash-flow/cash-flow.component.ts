import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Model} from '../model';
import {DateRange} from './date-range';
import {CashFlowService} from './cash-flow.service';
import {BugdetShellService} from '../bugdet-shell.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss']
})
export class CashFlowComponent implements OnInit {

  enteringBank: number = 0;

  operationsBuffer: Model[];

  filterDateRangeBuffer: DateRange;

  timeLimitBugdet: DateRange;

  constructor(
    private route: ActivatedRoute,
    private cashFlowService: CashFlowService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.enteringBank = Number(params.get('bank'));
    });
  }

  refreshFilterDateRange(filterDateRange: DateRange) {
    this.filterDateRangeBuffer = filterDateRange;
  }

  refreshBankBuffer(bank: number) {

  }

  refreshOperations(operations: Model[]) {
    this.operationsBuffer = operations;
    this.timeLimitBugdet = this.cashFlowService.calculateMinMaxOperations(operations);
  }
}
