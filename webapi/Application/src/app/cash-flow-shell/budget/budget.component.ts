import {Component, OnInit} from '@angular/core';
import {Operation} from '../operation';
import {DateRange} from './date-range';
import {ActivatedRoute} from '@angular/router';
import {BudgetService} from './budget.service';
import {CrudOperation} from './crud-operation';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {

  enteringBank = 0;

  enteringOperationsByFilter: Operation[];

  enteringOperationCRUD: CrudOperation;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.enteringBank = Number(params.get('bank'));
    });
  }

  refreshOperationsByFilter(filterDateRange: DateRange): void {
    this.budgetService.getOperations(filterDateRange);
    this.budgetService.operations.subscribe(operations => {
      this.enteringOperationsByFilter = operations.length !== 0 ? operations : undefined;
    });
  }

  updateOperation(crudOperation: CrudOperation): void {
    if (crudOperation.type === 'update') {
      this.budgetService.updateOperation(crudOperation.operation);
      this.enteringOperationCRUD = {
        type: crudOperation.type,
        operation: crudOperation.operation
      };
    }

    if (crudOperation.type === 'delete') {
      this.budgetService.deleteOperation(crudOperation.operation.id);
      this.enteringOperationCRUD = {
        type: crudOperation.type,
        operation: crudOperation.operation
      }
    }
  }
}
