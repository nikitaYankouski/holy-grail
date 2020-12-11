import {ChangeDetectionStrategy, Component, Input, ViewChild} from '@angular/core';

import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import {ChartService} from '../services/chart.service';
import {Operations} from '../../../operations';

import {Filter} from '../services/filter/filter';
import {FilterDay} from '../services/filter/filter-day';
import {FilterMonth} from '../services/filter/filter-month';
import {FilterYear} from '../services/filter/filter-year';
import {NoFilter} from '../services/filter/no-filter';
import {ViewModelChart} from '../view-model-chart';

import {BaseChartDirective} from 'ng2-charts';
import {TickModel} from '../tick-model';
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
  private _bank: number = 100;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
  }

  private _filterDateRange: DateRange;

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  @Input() set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.refreshDataInChart(this.currentFilter);
  }

  private _operations: Operations[];

  get operations(): Operations[] {
    return this._operations;
  }

  @Input() set operations(value: Operations[]) {
    this._operations = value;
    this.refreshDataInChart(this.currentFilter);
  }

  private _operationsGrouped = [];

  get operationsGrouped(): Operations[] {
    return this._operationsGrouped;
  }

  set operationsGrouped(value: Operations[]) {
    this._operationsGrouped = value;
  }

  viewModel: ViewModelChart[];

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
            callback: (value, index, values) => {
              return this.chartService.numberFormat(Number(value));
              ;
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
            callback: (value, index, values) => {
              return this.chartService.numberFormat(Number(value));
              ;
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
        label: (tooltipItem, data) => {
          return this.chartService.numberFormat(Number(tooltipItem.value));
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

  noData: boolean = false;

  @ViewChild(BaseChartDirective) private _chart;

  constructor(
    private chartService: ChartService,
    private cashFlowService: BudgetService
  ) { }

  refreshDataInChart(typeFilter: Filter) {
    if (typeof this.operations !== 'undefined') {
      this.operationsGrouped = this.chartService.grouping(
        this.cashFlowService.castNewObject(this.operations), typeFilter
      );
      this.operationsGrouped = this.cashFlowService.sortByDate(this.operationsGrouped);

      this.cashFlowService.calculateBalance(this.operationsGrouped, this.bank);

      if (typeof this.filterDateRange === 'undefined') {
        this.filterDateRange = this.getFirstAndLastDateOfCurrentMonth(new Date());
      }

      this.operationsGrouped = this.chartService
        .filterByDate(this.operationsGrouped, this.filterDateRange);

      if (this.operationsGrouped.length === 0) {
        this.noData = true;
        return;
      }

      this.noData = false;

      this.viewModel = this.chartService.castToView(this.operationsGrouped, this.currentFilter);

      this.setDataInChart();

      this.chartRefresh(); // it's possible not to update the chart when filtering

    }
  }

  getFirstAndLastDateOfCurrentMonth(lastDate: Date): DateRange {
    return new DateRange(
      new Date(lastDate.getFullYear(), lastDate.getMonth(), 1),
      new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 0)
    );
  }

  chartRefresh() {
    this.setTicksToScales(
      this.chartService.scalesCalculation(this.viewModel)
    );

    /*
      this._chart.chart.update();
      not working: not refresh tickets on a chart
    * */
    setTimeout(() => {
      this._chart.refresh();
    }, 0);
  }

  setTicksToScales(ticks: TickModel) {
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
  }

  setDataInChart() {
    this.chartData.find(it => it.label === DirectionsChart.balance)
      .data = this.viewModel.map(it => it.balance);

    this.chartData.find(it => it.label === DirectionsChart.cashIn)
      .data = this.viewModel.map(it => it.cashIn);

    this.chartData.find(it => it.label === DirectionsChart.cashOut)
      .data = this.viewModel.map(it => it.cashOut);

    this.chartLabels = this.viewModel.map(it => it.label);
  }

  grouping(typeFilter: string) {
    this.currentFilter = filterType[typeFilter];
    this.refreshDataInChart(this.currentFilter);
  }
}
