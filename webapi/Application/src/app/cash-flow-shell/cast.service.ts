import { Injectable } from '@angular/core';
import {DatePipe} from '@angular/common';
import {DbOperation} from './db-operation';
import {Operation} from './operation';
import {DbAddOperation} from './db-add-operation';

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
      userId: operation.userId,
      description: operation.description,
      timestamp: new Date(operation.timeStamp.substr(0, 10)),
      cashIn: operation.inCome ? operation.amountOfMoney : undefined,
      cashOut: operation.inCome ? undefined : operation.amountOfMoney,
      balance: 0
    };
  }

  castToDbOperation(operation: Operation): DbOperation {
    return {
      id: operation.id === 0 ? 0 : operation.id,
      userId: operation.userId,
      description: operation.description,
      inCome: typeof operation.cashIn !== 'undefined',
      timeStamp: this.castDateTimeToFormat(operation.timestamp),
      amountOfMoney: typeof operation.cashIn !== 'undefined' ? operation.cashIn : operation.cashOut
    };
  }

  castToDbAddOperation(operation: Operation): DbAddOperation {
    return {
      userId: operation.userId,
      description: operation.description,
      inCome: typeof operation.cashIn !== 'undefined',
      timeStamp: this.castDateTimeToFormat(operation.timestamp),
      amountOfMoney: typeof operation.cashIn !== 'undefined' ? operation.cashIn : operation.cashOut
    };
  }

  castDateTimeToFormat(date: Date): string {
    return this.datePipe.transform(date, DATE_FORMAT);
  }
}
