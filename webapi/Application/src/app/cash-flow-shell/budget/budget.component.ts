import {Component, OnInit} from '@angular/core';
import {Operation} from '../operation';
import {DateRange} from './date-range';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  enteringBank = 0;

  operationsBuffer: Operation[];

  filterDateRangeBuffer: DateRange;

  constructor(
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.enteringBank = Number(params.get('bank'));
    });
  }

  refreshFilterDateRange(filterDateRange: DateRange): void {
    this.filterDateRangeBuffer = filterDateRange;
  }

  refreshOperations(operations: Operation[]): void {
    this.operationsBuffer = operations;
  }
}
