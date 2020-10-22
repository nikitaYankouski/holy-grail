import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable } from "rxjs";
import { catchError, debounceTime, map } from 'rxjs/operators';

import { BaseOperation } from './base-operation';
import { ViewOperation } from './view-operation';

@Injectable({
  providedIn: 'root'
})
export class BugdetShellService {
  myAppUrl: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
  }

  getOperations(): Observable<ViewOperation[]> {
    return this.http.get<BaseOperation[]>(this.myAppUrl)
    .pipe(
      map((operations: BaseOperation[]) => 
        operations.map(operation => this.casting(operation))),
      catchError(this.handleError<any>('getOperations'))
    );
  }

  balanceСalculation(operations: ViewOperation[], bank: number): ViewOperation[] {
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

  castNewObject(operations: ViewOperation[]): ViewOperation[] { // slice
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
        })
      });
    return passToChart;
  }

  private toZero<T>(value: T): number {
    return typeof(undefined) === typeof(value) ? 0 : Number(value);
  }

  private toUndefined<T>(value: T): any {
    return Number(value) === 0 ? undefined : value;
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private casting(operation: BaseOperation) : ViewOperation {
    let model: ViewOperation = {
      id: operation.id,
      budgetId: operation.budgetId,
      description: operation.description,
      timestamp: operation.timestamp.substr(0,10),
      cashIn: operation.isIncome ? operation.amountOfMoney : undefined,
      cashOut: operation.isIncome ? undefined : operation.amountOfMoney,
      balance: 0
    }
    return model;
  }
}
