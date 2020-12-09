import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Model} from '../model';
import {DateRange} from './date-range';
import {BudgetService} from './budget.service';
import {CashFlowShellService} from '../cash-flow-shell.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  enteringBank: number = 0;

  operationsBuffer: Model[];

  filterDateRangeBuffer: DateRange;

  // enteringLastDate: Date;

  constructor(
    private route: ActivatedRoute,
    private cashFlowService: BudgetService) { }

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
