import {Injectable} from '@angular/core';
import {Operations} from '../operations';
import {CashFlowShellService} from '../cash-flow-shell.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private dataStringSource = new Subject<Operations[]>();

  dataString = this.dataStringSource.asObservable();

  constructor(private budgetApi: CashFlowShellService) {
  }

  getOperations(): void {
    this.budgetApi.getOperations().subscribe(operations => {
      this.dataStringSource.next(operations);
    });
  }

  sortByDate(models: Operations[]): Operations[] {
    return models.slice().sort((a: Operations, b: Operations) => {
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }

  calculateBalance(operations: Operations[], bank: number): Operations[] {
    operations.forEach(operation => {
      operation.cashIn = this.toZero(operation.cashIn);
      operation.cashOut = this.toZero(operation.cashOut);
    });

    operations.forEach((operation, index) => {
      operation.balance = index !== 0 ?
        operations[index - 1].balance + operation.cashIn - operation.cashOut :
        bank + operation.cashIn - operation.cashOut;
    });

    operations.forEach(operation => {
      operation.cashIn = this.toUndefined(operation.cashIn);
      operation.cashOut = this.toUndefined(operation.cashOut);
    });
    return operations;
  }

  castNewObject(operations: Operations[]): Operations[] { // slice
    let passToChart = [];
    operations.forEach(operation => {
      passToChart.push({
        id: operation.id,
        budgetId: operation.budgetId,
        description: operation.description,
        timestamp: operation.timestamp,
        cashIn: operation.cashIn,
        cashOut: operation.cashOut,
        balance: operation.balance
      });
    });
    return passToChart;
  }

  private toZero<T>(value: T): number {
    return typeof (undefined) === typeof (value) ? 0 : Number(value);
  }

  private toUndefined<T>(value: T): any {
    return Number(value) === 0 ? undefined : value;
  }
}
