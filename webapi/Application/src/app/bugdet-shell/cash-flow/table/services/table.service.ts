import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Model } from '../../../model';
import { ViewModelTable } from '../view-model-table';

const FORMAT_DATE: string = 'yyyy/MM/dd';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private datePipe: DatePipe) { }

  timeChange(operations: Model[], currentIndex: number) {
    const operationSwitchTime = operations.find(operation => (operation.id === currentIndex + 1));

    operationSwitchTime.timestamp = currentIndex === 0 ?
      this.getTimeStamp(operations, currentIndex + 2) : currentIndex > operations.length ?
        this.getTimeStamp(operations, currentIndex) : this.getTimeStamp(operations, currentIndex);
  }

  castToViewModel(operations: Model[]): ViewModelTable[] {
    const viewModel: ViewModelTable[] = [];
    operations.forEach(operation => {
      viewModel.push({
        id: operation.id,
        budgetId: operation.budgetId,
        description: operation.description,
        timestamp: this.datePipe.transform(operation.timestamp, 'yyyy-MM-dd'),
        cashIn: typeof operation.cashIn !== 'undefined' ?
          this.numberFormat(operation.cashIn) : undefined,
        cashOut: typeof operation.cashOut !== 'undefined' ?
          this.numberFormat(operation.cashOut) : undefined,
        balance: this.numberFormat(operation.balance)
      });
    });
    return viewModel;
  }

  castToOperations(viewModelTable: ViewModelTable[]): Model[] {
    return viewModelTable.map(viewModel => {
      return {
        id: viewModel.id,
        budgetId: viewModel.budgetId,
        description: viewModel.description,
        timestamp: new Date(viewModel.timestamp),
        cashIn: typeof viewModel.cashIn !== 'undefined' ?
          this.castIntlToNumber(viewModel.cashIn) : undefined,
        cashOut: typeof viewModel.cashOut !== 'undefined' ?
          this.castIntlToNumber(viewModel.cashOut) : undefined,
        balance: this.castIntlToNumber(viewModel.balance)
      }
    })
  }

  private castIntlToNumber(value: string): number {
    let returnValue = '';
    value = value.replace(/\s/g, "");
    for(let count = 0; count < value.length; count++) {
      if (value.charAt(count) === ',') { return Number(returnValue); }
      if (!isNaN(Number(value.charAt(count)))) {
        returnValue += Number(value.charAt(count));
      }
    }
    return Number(returnValue);
  }

  private numberFormat(value: number): string {
    return Intl.NumberFormat('pl', {
      style: 'currency',
      minimumIntegerDigits: 1,
      currency: 'PLN' }
    ).format(value);
  }

  private getTimeStamp(operations: Model[], indexInTable: number): Date {
    return operations.find(operation => operation.id === indexInTable).timestamp;
  }

}
