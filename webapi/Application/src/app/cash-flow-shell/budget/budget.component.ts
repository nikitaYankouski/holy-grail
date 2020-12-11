import {Component, OnInit} from '@angular/core';
import {Operations} from '../operations';
import {DateRange} from './date-range';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  enteringBank: number = 0;

  operationsBuffer: Operations[];

  filterDateRangeBuffer: DateRange;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.enteringBank = Number(params.get('bank'));
    });
  }

  refreshFilterDateRange(filterDateRange: DateRange) {
    this.filterDateRangeBuffer = filterDateRange;
  }

  refreshOperations(operations: Operations[]) {
    this.operationsBuffer = operations;
  }
}
