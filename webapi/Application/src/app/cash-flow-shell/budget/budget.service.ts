import {Injectable} from '@angular/core';
import {Operation} from '../operation';
import {CashFlowShellService} from '../cash-flow-shell.service';
import {Subject} from 'rxjs';
import {DateRange} from './date-range';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private operationsSource = new Subject<Operation[]>();

  operations = this.operationsSource.asObservable();

  constructor(private cashFlowShellApi: CashFlowShellService) { }

  static toZero<T>(value: T): number {
    return typeof undefined === typeof (value) ? 0 : Number(value);
  }

  static toUndefined<T>(value: T): any {
    return Number(value) === 0 ? undefined : value;
  }

  static numberFormat(value: number): string {
    return Intl.NumberFormat('pl', {
      style: 'currency',
      minimumIntegerDigits: 1,
      currency: 'PLN' }
    ).format(value);
  }

  getOperations(filter: DateRange): void {
    this.cashFlowShellApi.getOperations(filter).subscribe(params => {
      console.log(params);
      this.operationsSource.next(params);
    });
  }

  updateOperation(operation: Operation): void {
    this.cashFlowShellApi.updateOperation(operation).subscribe();
  }

  deleteOperation(id: number): void {
    this.cashFlowShellApi.deleteOperation(id).subscribe();
  }

  sortByDate(models: Operation[]): Operation[] {
    return models.slice().sort((a: Operation, b: Operation) => {
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
  }

  calculateBalance(operations: Operation[], bank: number): Operation[] {
    return operations.map((operation, index) => {
      operation.cashIn = BudgetService.toZero(operation.cashIn);
      operation.cashOut = BudgetService.toZero(operation.cashOut);

      operation.balance = index !== 0 ?
        operations[index - 1].balance + operation.cashIn - operation.cashOut :
        bank + operation.cashIn - operation.cashOut;

      operation.cashIn = BudgetService.toUndefined(operation.cashIn);
      operation.cashOut = BudgetService.toUndefined(operation.cashOut);
      return operation;
    });
  }
}
