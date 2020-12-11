import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {Operations} from '../../../operations';
import {ScalingCalculations} from '../scaling-calculations';
import {TickModel} from '../tick-model';
import {ViewModelChart} from '../view-model-chart';
import {Filter} from './filter/filter';
import {NoFilter} from './filter/no-filter';
import {DateRange} from '../../date-range';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private datePipe: DatePipe) {
  }

  scalesCalculation(viewModel: ViewModelChart[]): TickModel {
    const maxCashIn = Math.max(...viewModel.filter(model => typeof model.cashIn !== 'undefined')
      .map(model => model.cashIn));
    const maxCashOut = Math.max(...viewModel.filter(model => typeof model.cashOut !== 'undefined')
      .map(model => model.cashOut));

    const maxBalance = Math.max(...viewModel.map(model => model.balance));
    const minBalance = Math.min(...viewModel.map(model => model.balance));

    const maxLeft = maxCashIn >= maxCashOut ? maxCashIn : maxCashOut;

    const rightMax = maxBalance;
    const rightMin = minBalance <= 0 ? minBalance : 0;

    let chartScales = ScalingCalculations.roundUpNext(rightMax, rightMin, 'right');
    chartScales.leftMax = maxLeft;
    chartScales.leftMin = Math.round((chartScales.leftMax * chartScales.rightMin) / (chartScales.rightMax));

    let buf = ScalingCalculations.roundUpNext(chartScales.leftMax, chartScales.leftMin, 'left');
    chartScales.leftMax = buf.leftMax;
    chartScales.leftMin = buf.leftMin;
    chartScales.stepSizeLeft = buf.stepSizeLeft;

    if (chartScales.leftMin !== 0) {
      chartScales.leftMin = Math.round((chartScales.leftMax * chartScales.rightMin) / (chartScales.rightMax));

      const numberSteps = chartScales.rightMin / chartScales.stepSizeRight;
      const newStepSizeLeft = chartScales.leftMin / numberSteps;

      if (!Number.isInteger(newStepSizeLeft)) {
        chartScales.leftMin = ScalingCalculations.roundLastDigit(chartScales.leftMin, numberSteps);
        chartScales.stepSizeLeft = chartScales.leftMin / numberSteps;
      }
      else {
        chartScales.stepSizeLeft = newStepSizeLeft;
      }
    }
    return chartScales;
  }

  // rewrite
  grouping(operations: Operations[], filter: Filter): Operations[] {
    if (filter instanceof NoFilter) {
      return operations;
    }

    operations.forEach((parentOperation, index) => {
      parentOperation.timestamp = filter.filter(parentOperation.timestamp);

      for (let nextIndex = ++index; nextIndex < operations.length;) {
        const isNextTimestampEqual = parentOperation.timestamp.getTime() ===
          filter.filter(operations[nextIndex].timestamp).getTime();
        if (isNextTimestampEqual) {
          parentOperation = this.calculating(parentOperation, operations[nextIndex]);
          operations.splice(nextIndex, 1);
        } else {
          nextIndex++;
        }
      }
    });
    return operations;
  }

  filterByDate(operations: Operations[], filter: DateRange): Operations[] {
    return operations.filter(operation =>
      operation.timestamp >= filter.startDate && operation.timestamp <= filter.endDate);
  }

  convertDateToString(date: Date, filter: Filter): string {
    return this.datePipe.transform(date, filter.format);
  }

  castToView(operations: Operations[], filter: Filter): ViewModelChart[] {
    return operations.map(operation => {
      return {
        label: this.convertDateToString(operation.timestamp, filter),
        cashIn: typeof operation.cashIn !== 'undefined' ?
          operation.cashIn : undefined,
        cashOut: typeof operation.cashOut !== 'undefined' ?
          operation.cashOut : undefined,
        balance: typeof operation.balance !== 'undefined' ?
          operation.balance : undefined
      };
    });
  }

  // may be CurrencyPipe
  numberFormat(value: number): string {
    return Intl.NumberFormat('pl', {
        style: 'currency',
        minimumIntegerDigits: 1,
        currency: 'PLN'
      }
    ).format(value);
  }

  private calculating(parentOperation: Operations,
                      nextOperation: Operations): Operations {

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
    return typeof (undefined) === typeof (value) ? 0 : Number(value);
  }

  private toUndefined<T>(value: T): any {
    return Number(value) === 0 ? undefined : value;
  }
}
