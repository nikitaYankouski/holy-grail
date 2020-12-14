import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DbOperation } from './db-operation';
import { Operation } from './operation';

@Injectable({
  providedIn: 'root'
})
export class CashFlowShellService {
  myAppUrl: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
  }

  static castToOperation(operation: DbOperation): Operation {
    return {
      id: operation.id,
      budgetId: operation.budgetId,
      description: operation.description,
      timestamp: new Date(operation.timestamp.substr(0, 10)),
      cashIn: operation.isIncome ? operation.amountOfMoney : undefined,
      cashOut: operation.isIncome ? undefined : operation.amountOfMoney,
      balance: 0
    };
  }

  getOperations(): Observable<Operation[]> {
    return this.http.get<DbOperation[]>(this.myAppUrl)
    .pipe(
      map((operations: DbOperation[]) =>
        operations.map(operation => CashFlowShellService.castToOperation(operation))
      ),
      catchError(this.handleError<any>('getOperations'))
    );
  }

  private handleError<T>(result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
