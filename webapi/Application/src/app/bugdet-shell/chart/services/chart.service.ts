import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Model } from '../../model';
import { Filter } from './filter/filter';
import { NoFilter } from './filter/no-filter';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private datePipe: DatePipe) { }
  
  // rewrite 
  grouping(operations: Model[], filter: Filter): Model[] {
    if (filter instanceof NoFilter) {
      return operations;
    }
    
    operations.forEach((parentOperation, index) => {
      parentOperation.timestamp = filter.filter(parentOperation.timestamp);

      for (let nextIndex = ++index; nextIndex < operations.length;) {
        if (parentOperation.timestamp.getTime() === filter.filter(operations[nextIndex].timestamp).getTime()) {
          parentOperation = this.calculating(parentOperation, operations[nextIndex]);
          operations.splice(nextIndex, 1);
        }
        else {
          nextIndex++;
        }
      }
    });
    return operations;
  }

  convertDateToString(date: Date, filter: Filter): string {
    return this.datePipe.transform(date, filter.format);
  }

  private calculating(parentOperation: Model,
     nextOperation: Model): Model {

      parentOperation.cashIn = this.toZero(parentOperation.cashIn);
      parentOperation.cashOut = this.toZero(parentOperation.cashOut);
      nextOperation.cashIn = this.toZero(nextOperation.cashIn);
      nextOperation.cashOut = this.toZero(nextOperation.cashOut);

      parentOperation.cashIn += nextOperation.cashIn;
      parentOperation.cashOut += nextOperation.cashOut; 

      parentOperation.cashIn = this.toUndefined(parentOperation.cashIn);
      parentOperation.cashOut = this.toUndefined(parentOperation.cashOut);

      return parentOperation;
  }

  private toZero<T>(value: T): number {
    return typeof(undefined) === typeof(value) ? 0 : Number(value);
  }

  private toUndefined<T>(value: T): any {
    return Number(value) === 0 ? undefined : value;
  }
}
