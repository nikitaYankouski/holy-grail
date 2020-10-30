import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Model } from '../../model';
import { ViewModelTable } from '../view-model-table';

const FORMAT_DATE: string = 'yyyy/MM/dd';  

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private datePipe: DatePipe) { }

  timeChange(operations: Model[], currentIndex: number) {
    const operationSwitchTime = operations.find(operation => (operation.id === currentIndex + 1));

    operationSwitchTime.timestamp = currentIndex === 0 ? 
      this.getTimeStamp(operations, currentIndex + 2) : currentIndex > operations.length ? 
        this.getTimeStamp(operations, currentIndex) : this.getTimeStamp(operations, currentIndex);
  }

  castToViewModel(operations: Model[]): ViewModelTable[] {
    const viewModel: ViewModelTable[] = [];
    operations.forEach(operation => {
      viewModel.push({
        id: operation.id,
        description: operation.description,
        timestamp: this.datePipe.transform(operation.timestamp, FORMAT_DATE),
        cashIn: operation.cashIn,
        cashOut: operation.cashOut,
        balance: operation.balance
      });
    });
    return viewModel;
  }

  private getTimeStamp(operations: Model[], indexInTable: number): Date {
    return operations.find(operation => operation.id === indexInTable).timestamp;
  }

}