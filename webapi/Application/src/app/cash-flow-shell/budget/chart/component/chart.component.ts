import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';

import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import {ChartService} from '../services/chart.service';
import {Operation} from '../../../operation';

import {Filter} from '../services/filter/filter';
import {FilterDay} from '../services/filter/filter-day';
import {FilterMonth} from '../services/filter/filter-month';
import {FilterYear} from '../services/filter/filter-year';
import {NoFilter} from '../services/filter/no-filter';
import {ViewOperationChart} from '../view-operation-chart';

import {BaseChartDirective} from 'ng2-charts';
import {DateRange} from '../../date-range';
import {BudgetService} from '../../budget.service';

enum DirectionsChart {
  balance = 'BALANCE',
  cashIn = 'CASH IN',
  cashOut = 'CASH OUT'
}

const filterType = {
  day: new FilterDay(),
  month: new FilterMonth(),
  year: new FilterYear(),
  noFilter: new NoFilter()
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  private _bank = 100;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
  }

  private _filterDateRange: DateRange
    = BudgetService.getFirstAndLastDateOfCurrentMonth(new Date());

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  @Input() set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.refreshDataInChart(this.currentFilter);
  }

  private _operations: Operation[];

  get operations(): Operation[] {
    return this._operations;
  }

  @Input() set operations(value: Operation[]) {
    this._operations = value;
    this.refreshDataInChart(this.currentFilter);
  }

  private _operationsGrouped = [];

  get operationsGrouped(): Operation[] {
    return this._operationsGrouped;
  }

  set operationsGrouped(value: Operation[]) {
    this._operationsGrouped = value;
  }

  viewOperations: ViewOperationChart[];

  chartLabels: Label[] = [];

  chartPlugins = [pluginDataLabels];

  chartType: ChartType = 'bar';

  chartLegend = true;

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true,
            callback: (value) => {
              return BudgetService.numberFormat(Number(value));
            }
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            callback: (value) => {
              return BudgetService.numberFormat(Number(value));
            }
          }
        }
      ],
    },
    plugins: {
      datalabels: {
        display: false
      }
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return BudgetService.numberFormat(Number(tooltipItem.value));
        }
      }
    }
  };

  chartData: ChartDataSets[] = [
    {data: [], label: DirectionsChart.balance, type: 'line', yAxisID: 'y-axis-1', fill: false, lineTension: 0},
    {data: [], label: DirectionsChart.cashIn, yAxisID: 'y-axis-0', stack: 'a'},
    {data: [], label: DirectionsChart.cashOut, yAxisID: 'y-axis-0', stack: 'b'},
  ];

  chartColors: Color[] = [
    // balance
    {
      backgroundColor: 'rgb(255, 155, 133)',
      borderColor: 'rgb(255, 217, 125)'
    },
    // cash in
    {
      backgroundColor: 'rgb(20, 140, 58)'
    },
    // cash out
    {
      backgroundColor: 'rgb(235, 45, 45)'
    }
  ];

  currentFilter: Filter = new NoFilter();

  @ViewChild(BaseChartDirective) private _chart;

  constructor(
    private chartService: ChartService,
    private budgetService: BudgetService
  ) { }

  refreshDataInChart(typeFilter: Filter): void {
    if (typeof this.operations !== 'undefined') {
      this.operationsGrouped = typeFilter instanceof NoFilter ?
        [...this.operations] : this.chartService.toGroupOperations([...this.operations], typeFilter);

      this.operationsGrouped = this.budgetService.sortByDate(this.operationsGrouped);

      this.operationsGrouped = this.budgetService.calculateBalance(this.operationsGrouped, this.bank);

      this.operationsGrouped = BudgetService.filterByDate(this.operationsGrouped, this.filterDateRange);

      this.viewOperations = this.chartService.castToView(this.operationsGrouped, this.currentFilter);

      this.setDataInChart(this.viewOperations);

      this.chartRefresh(this.viewOperations);
    }
  }

  chartRefresh(operations: ViewOperationChart[]): void {
    const ticks = this.chartService.scalesCalculation(operations);
    this.chartOptions.scales.yAxes.forEach(it => {
      if (it.id === 'y-axis-0') {
        it.ticks.max = ticks.leftMax;
        it.ticks.min = ticks.leftMin;
        it.ticks.stepSize = ticks.stepSizeLeft;
      }
      if (it.id === 'y-axis-1') {
        it.ticks.max = ticks.rightMax;
        it.ticks.min = ticks.rightMin;
        it.ticks.stepSize = ticks.stepSizeRight;
      }
    });

    /*
      this._chart.chart.update(); =>
      not working: not refresh tickets on a chart
    * */
    setTimeout(() => {
      this._chart.refresh();
    }, 0);
  }

  setDataInChart(operations: ViewOperationChart[]): void {
    this.chartData.find(it => it.label === DirectionsChart.balance)
      .data = operations.map(it => it.balance);

    this.chartData.find(it => it.label === DirectionsChart.cashIn)
      .data = operations.map(it => it.cashIn);

    this.chartData.find(it => it.label === DirectionsChart.cashOut)
      .data = operations.map(it => it.cashOut);

    this.chartLabels = operations.map(it => it.label);
  }

  grouping(typeFilter: string): void {
    this.currentFilter = filterType[typeFilter];
    this.refreshDataInChart(this.currentFilter);
  }
}
