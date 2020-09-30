import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { retry, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Operation } from './operation';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TableService {
  myAppUrl: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
  }

  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(this.myAppUrl)
    .pipe(
      map((operations: Operation[]) => 
        operations.map(operation => this.cast(operation))),
      retry(1),
      catchError(this.handleError<any>('getOperations'))
    );
  }

  // ERROR

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  // CAST 

  cast(operation: Operation) : Operation {
    let model = { 
      id: operation.id,
      budgetId: operation.budgetId, 
      description: operation.description,
      IsIncome: operation.IsIncome,
      amountOfMoney: operation.amountOfMoney,
      timestamp: operation.timestamp.substr(0,10),
      balance: operation.balance 
    }
    return model;
  }
}