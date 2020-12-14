import {DatePipe} from '@angular/common';
import {Injectable} from '@angular/core';
import {Operation} from '../../../operation';
import {ScalingCalculations} from '../scaling-calculations';
import {TickModel} from '../tick-model';
import {ViewOperationChart} from '../view-operation-chart';
import {Filter} from './filter/filter';
import {DateRange} from '../../date-range';
import {BudgetService} from '../../budget.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private datePipe: DatePipe) {
  }

  static calculating(parentOperation: Operation, nextOperation: Operation): Operation {
    parentOperation.cashIn = BudgetService.toZero(parentOperation.cashIn);
    parentOperation.cashOut = BudgetService.toZero(parentOperation.cashOut);
    nextOperation.cashIn = BudgetService.toZero(nextOperation.cashIn);
    nextOperation.cashOut = BudgetService.toZero(nextOperation.cashOut);

    parentOperation.cashIn += nextOperation.cashIn;
    parentOperation.cashOut += nextOperation.cashOut;

    parentOperation.cashIn = BudgetService.toUndefined(parentOperation.cashIn);
    parentOperation.cashOut = BudgetService.toUndefined(parentOperation.cashOut);

    return parentOperation;
  }

  scalesCalculation(viewModel: ViewOperationChart[]): TickModel {
    const maxCashIn = Math.max(...viewModel.filter(model => typeof model.cashIn !== 'undefined')
      .map(model => model.cashIn));
    const maxCashOut = Math.max(...viewModel.filter(model => typeof model.cashOut !== 'undefined')
      .map(model => model.cashOut));

    const maxBalance = Math.max(...viewModel.map(model => model.balance));
    const minBalance = Math.min(...viewModel.map(model => model.balance));

    const maxLeft = maxCashIn >= maxCashOut ? maxCashIn : maxCashOut;

    const rightMax = maxBalance;
    const rightMin = minBalance <= 0 ? minBalance : 0;

    const chartScales = ScalingCalculations.roundUpNext(rightMax, rightMin, 'right');
    chartScales.leftMax = maxLeft;
    chartScales.leftMin = Math.round((chartScales.leftMax * chartScales.rightMin) / (chartScales.rightMax));

    const chartScalesNextRoundUp = ScalingCalculations.roundUpNext(chartScales.leftMax, chartScales.leftMin, 'left');
    chartScales.leftMax = chartScalesNextRoundUp.leftMax;
    chartScales.leftMin = chartScalesNextRoundUp.leftMin;
    chartScales.stepSizeLeft = chartScalesNextRoundUp.stepSizeLeft;

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

  toGroupOperations(operations: Operation[], filter: Filter): Operation[] {
    return operations.map((operation, index) => {
      operation.timestamp = filter.filter(operation.timestamp);

      for (let nextIndex = ++index; nextIndex < operations.length;) {
        const isNextTimestampEqual = operation.timestamp.getTime()
          === filter.filter(operations[nextIndex].timestamp).getTime();
        if (isNextTimestampEqual) {
          operation = ChartService.calculating(operation, operations[nextIndex]);
          operations.splice(nextIndex, 1);
          continue;
        }
        nextIndex++;
      }
      return operation;
    });
  }

  filterByDate(operations: Operation[], filter: DateRange): Operation[] {
    return operations.filter(operation =>
      operation.timestamp >= filter.startDate && operation.timestamp <= filter.endDate);
  }

  convertDateToString(date: Date, filter: Filter): string {
    return this.datePipe.transform(date, filter.format);
  }

  castToView(operations: Operation[], filter: Filter): ViewOperationChart[] {
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
}
