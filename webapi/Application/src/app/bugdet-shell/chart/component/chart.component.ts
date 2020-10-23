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
  private _bank: number;

  get bank(): number {
    return this._bank;
  }
  @Input() set bank(value: number) {
    this._bank = value;
  }
  
  private _operations = [];

  get operations(): ViewOperation[] {
    return this._operations;
  }
  @Input() set operations(value: ViewOperation[]) {
    this._operations = value;
    this.refreshDataInChart(this.currentFilter);
  }
  
  private _operationsGroped = [];

  get operationsGroped(): ViewOperation[] {
    return this._operationsGroped;
  }
  set operationsGroped(value: ViewOperation[]) {
    this._operationsGroped = value;
  }
  

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
  
  currentFilter: Filter = FilterTypes.noFilter;


  dataBalance: number[] = [];

  labelDate: string[] = [];

  cashIn: number[];

  cashOut: number[];

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
        this.currentFilter = FilterTypes.day;
        this.refreshDataInChart(this.currentFilter);
        break;
      }
      case FilterTypes.month.name: {
        this.currentFilter = FilterTypes.month;
        this.refreshDataInChart(this.currentFilter);
        break;
      }
      case FilterTypes.year.name: {
        this.currentFilter = FilterTypes.year;
        this.refreshDataInChart(this.currentFilter);
        break;
      }
      case FilterTypes.noFilter.name: {
        this.currentFilter = FilterTypes.noFilter;
        this.refreshDataInChart(this.currentFilter);
        break;
      }
    };
  }
}
