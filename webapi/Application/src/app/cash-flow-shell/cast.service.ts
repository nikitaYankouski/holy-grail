import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import {DbOperation} from './db-operation';
import {Operation} from './operation';

const DATE_FORMAT = 'yyyy-MM-dd';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  constructor(
    private datePipe: DatePipe
  ) { }

  castToOperation(operation: DbOperation): Operation {
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

  castToDbOperation(operation: Operation): DbOperation {
    return {
      id: 0,
      budgetId: operation.budgetId,
      description: operation.description,
      isIncome: typeof operation.cashIn !== null,
      timestamp: this.datePipe.transform(operation.timestamp, DATE_FORMAT),
      amountOfMoney: typeof operation.cashIn !== null ? operation.cashIn : operation.cashOut
    };
  }
}