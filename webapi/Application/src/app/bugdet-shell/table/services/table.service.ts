import { Injectable } from '@angular/core';
import { BaseOperation } from '../../base-operation';
import { ViewOperation } from '../../view-operation';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  timeChange(operations: ViewOperation[], currentIndex: number) {
    const operationSwitchTime = operations.find(operation => (operation.id === currentIndex + 1));

    operationSwitchTime.timestamp = currentIndex === 0 ? 
      this.getTimeStamp(operations, currentIndex + 2) : currentIndex > operations.length ? 
        this.getTimeStamp(operations, currentIndex) : this.getTimeStamp(operations, currentIndex);
  }

  private getTimeStamp(operations: ViewOperation[], indexInTable: number): string {
    return operations.find(operation => operation.id === indexInTable).timestamp;
  }
}