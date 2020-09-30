import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import { HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
let TableService = class TableService {
    constructor(http) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
        };
        this.myAppUrl = environment.appUrl;
        this.myApiUrl = 'bugdet';
    }
    getOperations() {
        return this.http.get(this.myAppUrl + this.myApiUrl)
            .pipe(retry(1), catchError(this.handleError('getOperations')));
    }
    // ERROR
    handleError(operation = 'operation', result) {
        return (error) => {
            console.error(error); // log to console instead
            this.log(`${operation} failed: ${error.message}`);
            return of(result);
        };
    }
    log(message) {
        console.log(`error: ${message}`);
    }
};
TableService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TableService);
export { TableService };
//# sourceMappingURL=table.service.js.map