import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Model } from '../../model';
import { ScalingCalculations } from '../scaling-calculations';
import { TickModel } from '../tick-model';
import { ViewModelChart } from '../view-model-chart';
import { Filter } from './filter/filter';
import { NoFilter } from './filter/no-filter';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private datePipe: DatePipe) { }

  scalesCalculation(viewModel: ViewModelChart[]): TickModel {
    const chartScales: TickModel = new TickModel();

    const maxCashIn = Math.max(...viewModel.filter(model => typeof model.cashIn !== 'undefined').map(model => model.cashIn));
    const maxCashOut = Math.min(...viewModel.filter(model => typeof model.cashOut !== 'undefined').map(model => model.cashOut));
    
    const maxLeft =  maxCashIn >= maxCashOut ? ScalingCalculations.roundUpToNextDigit(maxCashIn) : ScalingCalculations.roundUpToNextDigit(maxCashOut);
    chartScales.leftMax = maxLeft;
    
    const maxBalance = Math.max(...viewModel.map(model => model.balance));
    const minBalance = Math.min(...viewModel.map(model => model.balance));

    const minLeft = minBalance >= 0 ? 0 : ScalingCalculations.roundUpToNextDigit(minBalance * -1) * -1;
    chartScales.leftMin = minLeft;

    if (maxBalance <= maxLeft) {
      chartScales.rightMax = maxLeft;
      chartScales.rightMin = minLeft;
      return chartScales;
    }
    
    const rangeBetweenMaxLeftAndMaxBalance = maxBalance - maxLeft;
    const maxRight = ScalingCalculations.roundUpToNextDigit(maxLeft + rangeBetweenMaxLeftAndMaxBalance);
    const rangeBetweenMaxLeftAndMaxBalanceRounded = maxRight - maxLeft;

    const percentLeftMaxOfRange = ScalingCalculations.percentageCalculation(maxLeft, rangeBetweenMaxLeftAndMaxBalanceRounded);
    const percentOfLeftMax = ScalingCalculations.percentageOfNumberCalculation(maxLeft, percentLeftMaxOfRange);

    if (minLeft === 0) {
      chartScales.rightMax = maxLeft + percentOfLeftMax;
      chartScales.rightMin = minLeft;
      return chartScales;
    }

    const percentOfLeftMin = ScalingCalculations.percentageOfNumberCalculation(minLeft, percentLeftMaxOfRange);
    chartScales.rightMax = maxLeft + percentOfLeftMax;
    chartScales.rightMin = minLeft + percentOfLeftMin;
    return chartScales;
  }

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
