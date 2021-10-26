import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Operation } from '../../../../operation';
import { ViewOperationTable } from '../view-operation-table';
import {BudgetService} from '../../../budget.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(
    private datePipe: DatePipe,
  ) { }

  static castIntlToNumber(value: string): number {
    let returnValue = '';
    value = value.replace(/\s/g, '');
    for (let count = 0; count < value.length; count++) {
      if (value.charAt(count) === ',') { return Number(returnValue); }
      if (!isNaN(Number(value.charAt(count)))) {
        returnValue += Number(value.charAt(count));
      }
    }
    return Number(returnValue);
  }

  timeChange(operations: Operation[], currentIndex: number): void {
    const operationSwitchTime = operations[currentIndex];
    operationSwitchTime.timestamp = operations[currentIndex === 0 ? currentIndex + 1 : currentIndex - 1].timestamp;
  }

  castToViewModel(operations: Operation[]): ViewOperationTable[] {
    const viewModel: ViewOperationTable[] = [];
    operations.forEach(operation => {
      viewModel.push({
        id: operation.id,
        budgetId: operation.budgetId,
        description: operation.description,
        timestamp: this.datePipe.transform(operation.timestamp, 'yyyy-MM-dd'),
        cashIn: typeof operation.cashIn !== 'undefined' ?
          BudgetService.numberFormat(operation.cashIn) : undefined,
        cashOut: typeof operation.cashOut !== 'undefined' ?
          BudgetService.numberFormat(operation.cashOut) : undefined,
        balance: BudgetService.numberFormat(operation.balance)
      });
    });
    return viewModel;
  }

  castToOperations(viewModelTable: ViewOperationTable[]): Operation[] {
    return viewModelTable.map(viewModel => {
      return {
        id: viewModel.id,
        budgetId: viewModel.budgetId,
        description: viewModel.description,
        timestamp: new Date(viewModel.timestamp),
        cashIn: typeof viewModel.cashIn !== 'undefined' ?
          TableService.castIntlToNumber(viewModel.cashIn) : undefined,
        cashOut: typeof viewModel.cashOut !== 'undefined' ?
          TableService.castIntlToNumber(viewModel.cashOut) : undefined,
        balance: TableService.castIntlToNumber(viewModel.balance)
      };
    });
  }
}
