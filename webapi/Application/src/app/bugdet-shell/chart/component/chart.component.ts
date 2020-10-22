import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { ChartService } from '../services/chart.service';
import { ViewOperation } from '../../view-operation';
import { BugdetShellService } from '../../bugdet-shell.service';
import { FilterTypes } from '../services/grouping-model/filter-types';
import { Filter } from '../services/grouping-model/filter';

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
  private _operations = [];

  get operations(): ViewOperation[] {
    return this._operations;
  }
  @Input() set operations(value: ViewOperation[]) {
    this._operations = value;
    this.refreshDataInChart(this.filter);
  }

  private _operationsGroped = [];

  get operationsGroped(): ViewOperation[] {
    return this._operationsGroped;
  }

  set operationsGroped(value: ViewOperation[]) {
    this._operationsGroped = value;
  }
  
  private _bank: number;

  get bank(): number {
    return this._bank;
  }
  @Input() set bank(value: number) {
    this._bank = value;
  }

  operationsView: ViewOperation[];

  dataBalance: number[] = [];

  labelDate: string[] = [];

  cashIn: number[];

  cashOut: number[];

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
            beginAtZero: true
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true
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
    { data: [], label: DirectionsChart.balance, type: 'line', yAxisID: 'y-axis-1'},
    { data: [], label: DirectionsChart.cashIn, yAxisID: 'y-axis-0', stack: 'a' },
    { data: [], label: DirectionsChart.cashOut, yAxisID: 'y-axis-0', stack: 'a' },
  ];

  barChartLabels: Label[] = [];

  barChartPlugins = [pluginDataLabels];

  filter: Filter = FilterTypes.day;

  constructor(
    private chartService: ChartService,
    private budgetApi: BugdetShellService
  ) {}

  ngOnInit(): void { }

  refreshDataInChart(typeFilter: Filter) {  
    if (typeof this.operations !== 'undefined') { 
      this.operationsGroped = this.chartService.grouping(
        this.budgetApi.castNewObject(this.operations), typeFilter
      );
      this.budgetApi.balanceСalculation(this.operationsGroped, this.bank);

      this.setDataToBufferForChart(this.operationsGroped);
      this.setDataInChart();
    }
  }

  setDataInChart() {
    let rowBalance = this.barChartData.find(it => it.label === DirectionsChart.balance);
    rowBalance.data = this.dataBalance;
    
    let rowCashIn = this.barChartData.find(it => it.label === DirectionsChart.cashIn);
    rowCashIn.data = this.cashIn;

    let rowCashOut = this.barChartData.find(it => it.label === DirectionsChart.cashOut);
    rowCashOut.data = this.cashOut;

    this.barChartLabels = this.labelDate;
  }
  
  setDataToBufferForChart(operations: ViewOperation[]) {
    this.dataBalance = [];
    this.labelDate = [];
    this.cashIn = [];
    this.cashOut = [];

    operations.forEach(operation => {
      this.dataBalance.push(operation.balance);
      this.labelDate.push(operation.timestamp);
      this.cashIn.push(operation.cashIn);
      this.cashOut.push(operation.cashOut);
    });
  }

  grouping(typeGrouping: string) {
    switch(typeGrouping) {
      case FilterTypes.day.name: {
        this.filter = FilterTypes.day;
        this.refreshDataInChart(FilterTypes.day);
        break;
      }
      case FilterTypes.month.name: {
        this.filter = FilterTypes.month;
        this.refreshDataInChart(FilterTypes.month);
        break;
      }
      case FilterTypes.year.name: {
        this.filter = FilterTypes.year;
        this.refreshDataInChart(FilterTypes.year)
        break;
      }
    };
  }
}
