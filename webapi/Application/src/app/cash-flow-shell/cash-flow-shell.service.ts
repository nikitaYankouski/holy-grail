import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {of, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {DbOperation} from './db-operation';
import {Operation} from './operation';
import {CastService} from './cast.service';

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

  getOperations(fromDate: Date, toDate: Date): Observable<Operation[]> {
    const options = { params: new HttpHeaders().set('fromDate').set('toDate') };
    const apiUrlGetByDate = this.apiUrl + '/' + fromDate + '/' + toDate;

    return this.http.get<DbOperation[]>(apiUrlGetByDate, options)
      .pipe(
        map((operations: DbOperation[]) =>
          operations.map(operation => this.castService.castToOperation(operation))
        ),
        catchError(this.handleError<any>('getOperations'))
      );
  }

  addOperation(operation: Operation): Observable<DbOperation> {
    const operationToBackend = this.castService.castToDbOperation(operation);
    return this.http.post<DbOperation>(this.apiUrl, operationToBackend)
      .pipe(
        catchError(this.handleError<any>('addOperation'))
      );
  }

  updateOperation(operation: Operation): Observable<DbOperation> {
    const operationToBackend = this.castService.castToDbOperation(operation);
    return this.http.put<DbOperation>(this.apiUrl, operationToBackend)
      .pipe(
        catchError(this.handleError<any>('updateOperation'))
      );
  }

  deleteOperation(id: number): Observable<{}> {
    const options = { params: new HttpHeaders().set('id') };
    const apiUrlDelete = this.apiUrl + '/' + id;

    return this.http.delete<DbOperation>(apiUrlDelete, options)
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
