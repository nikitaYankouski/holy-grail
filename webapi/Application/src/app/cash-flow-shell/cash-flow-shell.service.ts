import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';

import { DbOperations } from './db-operations';
import { Operations } from './operations';

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

  getOperations(): Observable<Operations[]> {
    return this.http.get<DbOperations[]>(this.myAppUrl)
    .pipe(
      map((operations: DbOperations[]) =>
        operations.map(operation => this.casting(operation))
      ),
      catchError(this.handleError<any>('getOperations'))
    );
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private casting(operation: DbOperations) : Operations {
    let model: Operations = {
      id: operation.id,
      budgetId: operation.budgetId,
      description: operation.description,
      timestamp: new Date(operation.timestamp.substr(0,10)),
      cashIn: operation.isIncome ? operation.amountOfMoney : undefined,
      cashOut: operation.isIncome ? undefined : operation.amountOfMoney,
      balance: 0
    }
    return model;
  }
}
