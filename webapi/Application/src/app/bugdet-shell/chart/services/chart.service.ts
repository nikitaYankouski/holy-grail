import { Injectable } from '@angular/core';
import { ViewOperation } from '../../view-operation';
import { Filter } from './grouping-model/filter';
import { FilterTypes } from './grouping-model/filter-types';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  
  grouping(operations: ViewOperation[], filter: Filter): ViewOperation[] {
    if (filter === FilterTypes.noFilter) {
      return operations;
    }

    operations.forEach((parentOperation, index) => {
      let stringFilter = parentOperation.timestamp.substr(filter.from, filter.length);
      parentOperation.timestamp = stringFilter;

      for(let nextIndex = ++index; nextIndex < operations.length;) {
        if (stringFilter === operations[nextIndex].timestamp.substr(filter.from, filter.length)) {
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

  private calculating(parentOperation: ViewOperation,
     nextOperation: ViewOperation): ViewOperation {

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
