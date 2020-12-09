import {Injectable} from '@angular/core';
import {Model} from '../model';
import {BugdetShellService} from '../bugdet-shell.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {

  private dataStringSource = new Subject<Model[]>();

  dataString = this.dataStringSource.asObservable();

  constructor(private budgetApi: BugdetShellService) {
  }

  getOperations(): void {
    this.budgetApi.getOperations().subscribe(operations => {
      this.dataStringSource.next(operations);
    });
  }

  sortByDate(models: Model[]): Model[] {
    return models.slice().sort((a: Model, b: Model) => {
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }

  calculateBalance(operations: Model[], bank: number): Model[] {
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

  castNewObject(operations: Model[]): Model[] { // slice
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
