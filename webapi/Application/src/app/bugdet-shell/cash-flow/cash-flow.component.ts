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

  // enteringLastDate: Date;

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

  refreshOperations(operations: Model[]) {
    this.operationsBuffer = operations;
    // if (typeof this.enteringLastDate === 'undefined') {
    //   this.enteringLastDate = this.cashFlowService.sortByDate(operations)[operations.length - 1].timestamp;
    // }
  }
}
