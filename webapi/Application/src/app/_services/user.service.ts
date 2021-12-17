import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DateRange} from '../cash-flow-shell/budget/date-range';
import {Observable} from 'rxjs';
import {Operation} from '../cash-flow-shell/operation';
import {DbOperation} from '../cash-flow-shell/db-operation';
import {catchError, map} from 'rxjs/operators';
import {User} from '../user';
import {environment} from '../../environments/environment';

const USER_API = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private activateUser: User;

  constructor(private http: HttpClient) {}

  getUserByName(name: string): Observable<User> {
    const options = {params: new HttpParams().set('username', name)};
    return this.http.get<User>(USER_API, options);
  }
}
