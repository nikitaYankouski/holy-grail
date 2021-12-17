import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {of, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {DbOperation} from './db-operation';
import {Operation} from './operation';
import {CastService} from './cast.service';
import {DateRange} from './budget/date-range';

@Injectable({
  providedIn: 'root'
})
export class CashFlowShellService {
  apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})
  };

  constructor(
    private http: HttpClient,
    private castService: CastService) {
    this.apiUrl = environment.appUrl;
  }

  getOperations(filter: DateRange): Observable<Operation[]> {
    const startDate = this.castService.castDateTimeToFormat(filter.startDate);
    const endDate = this.castService.castDateTimeToFormat(filter.endDate);
    const options = {params: new HttpParams().set('fromDate', startDate).set('toDate', endDate)};

    return this.http.get<DbOperation[]>(this.apiUrl, options)
      .pipe(
        map((operations: DbOperation[]) =>
          operations.map(operation => this.castService.castToOperation(operation))
        ),
        catchError(this.handleError<any>('getOperations'))
      );
  }

  addOperation(operation: Operation): Observable<DbOperation> {
    const operationToBackend = this.castService.castToDbAddOperation(operation);
    return this.http.post<DbOperation>(this.apiUrl + '/add', operationToBackend)
      .pipe(
        catchError(this.handleError<any>('addOperation'))
      );
  }

  updateOperation(operation: Operation): Observable<DbOperation> {
    const operationToBackend = this.castService.castToDbOperation(operation);
    return this.http.put<DbOperation>(this.apiUrl + '/update/' + operation.id, operationToBackend)
      .pipe(
        catchError(this.handleError<any>('updateOperation'))
      );
  }

  deleteOperation(id: number): Observable<{}> {
    //const options = { params: new HttpParams().set('id', String(id)) };
    return this.http.delete<DbOperation>(this.apiUrl + '/delete/' + id)
      .pipe(
        catchError(this.handleError<any>('deleteOperation'))
      );
  }

  private handleError<T>(result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
