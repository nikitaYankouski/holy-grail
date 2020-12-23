import {Injectable} from '@angular/core';
import {Operation} from '../operation';
import {CashFlowShellService} from '../cash-flow-shell.service';
import {Subject} from 'rxjs';
import {DateRange} from './date-range';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private dataSource = new Subject<Operation[]>();

  dataOutput = this.dataSource.asObservable();

  constructor(private budgetApi: CashFlowShellService) {
  }

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

  static getFirstAndLastDateOfCurrentMonth(lastDate: Date): DateRange {
    return new DateRange(
      new Date(lastDate.getFullYear(), lastDate.getMonth(), 1),
      new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 0)
    );
  }

  static filterByDate(operations: Operation[], filter: DateRange): Operation[] {
    return operations.filter(operation =>
      operation.timestamp >= filter.startDate && operation.timestamp <= filter.endDate);
  }

  getOperations(): void {
    this.budgetApi.getOperations().subscribe(operations => {
      this.dataSource.next(operations);
    });
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
