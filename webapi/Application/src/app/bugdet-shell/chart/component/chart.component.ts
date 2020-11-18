import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType, ChartYAxe } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { ChartService } from '../services/chart.service';
import { Model } from '../../model';
import { BugdetShellService } from '../../bugdet-shell.service';

import { Filter } from '../services/filter/filter';
import { FilterDay } from '../services/filter/filter-day';
import { FilterMonth } from '../services/filter/filter-month';
import { FilterYear } from '../services/filter/filter-year';
import { NoFilter } from '../services/filter/no-filter';
import { ViewModelChart } from '../view-model-chart';

import { BaseChartDirective } from 'ng2-charts';
import { TickModel } from '../tick-model';
import {DateRange} from '../../date-range';

enum DirectionsChart {
  balance = 'BALANCE',
  cashIn = 'CASH IN',
  cashOut = 'CASH OUT'
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  private _bank: number;

  get bank(): number {
    return this._bank;
  }
  @Input() set bank(value: number) {
    this._bank = 100; // !
  }

  private _filterDateRange: DateRange;

  get filterDateRange(): DateRange {
    return  this._filterDateRange;
  }
  @Input() set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.refreshDataInChart(this.currentFilter);
  }

  private _operations: Model[];

  get operations(): Model[] {
    return this._operations;
  }
  @Input() set operations(value: Model[]) {
    this._operations = value;
    this.refreshDataInChart(this.currentFilter);
  }

  private _operationsGroped = [];

  get operationsGroped(): Model[] {
    return this._operationsGroped;
  }
  set operationsGroped(value: Model[]) {
    this._operationsGroped = value;
  }

  viewModel: ViewModelChart[];


  barChartLabels: Label[] = [];

  barChartPlugins = [pluginDataLabels];

  barChartType: ChartType = 'bar';

  barChartLegend = true;

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true,
            callback: (value, index, values) => {
              return this.chartService.numberFormat(Number(value));;
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
              return this.chartService.numberFormat(Number(value));;
            }
          }
        }
      ],
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  barChartData: ChartDataSets[] = [
    { data: [], label: DirectionsChart.balance, type: 'line', yAxisID: 'y-axis-1', fill: false, lineTension: 0 },
    { data: [], label: DirectionsChart.cashIn, yAxisID: 'y-axis-0', stack: 'a' },
    { data: [], label: DirectionsChart.cashOut, yAxisID: 'y-axis-0', stack: 'b' },
  ];

  barChartColors: Color[] = [
    // balance
    {
      backgroundColor: 'rgb(255, 155, 133)',
      borderColor: 'rgb(255, 217, 125)'
    },
    // cash in
    {
      backgroundColor: 'rgb(96, 211, 148)'
    },
    // cash out
    {
      backgroundColor: 'rgb(255, 155, 133)'
    }
  ];

  currentFilter: Filter = new NoFilter();

  @ViewChild(BaseChartDirective) private _chart;

  constructor(
    private chartService: ChartService,
    private budgetApi: BugdetShellService
  ) { }

  ngOnInit(): void { }

  refreshDataInChart(typeFilter: Filter) {
    if (typeof this.operations !== 'undefined') {
      this.operationsGroped = this.chartService.grouping(
        this.budgetApi.castNewObject(this.operations), typeFilter
      );
      this.operationsGroped = this.budgetApi.sortByDate(this.operationsGroped);

      this.budgetApi.balanceСalculation(this.operationsGroped, this.bank);

      if (typeof this.filterDateRange !== 'undefined') {
        this.operationsGroped = this.chartService
          .filterByDate(this.operationsGroped, this.filterDateRange);
      }

      this.viewModel = this.chartService.castToView(this.operationsGroped, this.currentFilter);

      this.setDataInChart();

      this.chartRefresh(); // it's possible not to update the chart when filtering
    }
  }

  chartRefresh() {
    this.setTicksToScales(
      this.chartService.scalesCalculation(this.viewModel)
    );

    setTimeout(() => {
      this._chart.refresh();
    }, 0);
  }

  setTicksToScales(ticks: TickModel) {
    this.barChartOptions.scales.yAxes.forEach(it => {
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
    this.barChartData.find(it => it.label === DirectionsChart.balance)
      .data = this.viewModel.map(it => it.balance);

    this.barChartData.find(it => it.label === DirectionsChart.cashIn)
      .data = this.viewModel.map(it => it.cashIn);

    this.barChartData.find(it => it.label === DirectionsChart.cashOut)
      .data = this.viewModel.map(it => it.cashOut);

    this.barChartLabels = this.viewModel.map(it => it.label);
  }

  // rewrite
  grouping(typeFilter: string) {
    switch (typeFilter) {
      case 'day': {
        this.currentFilter = new FilterDay();
        this.refreshDataInChart(this.currentFilter);
        break;
      }
      case 'month': {
        this.currentFilter = new FilterMonth();
        this.refreshDataInChart(this.currentFilter);
        break;
      }
      case 'year': {
        this.currentFilter = new FilterYear();
        this.refreshDataInChart(this.currentFilter);
        break;
      }
      case 'noFilter': {
        this.currentFilter = new NoFilter();
        this.refreshDataInChart(this.currentFilter);
        break;
      }
    };
  }
}
