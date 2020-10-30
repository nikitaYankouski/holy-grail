import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
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
            
            callback: function(value, index, values) {
              return value + ' PLN';
            }
          },
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            callback: function(value, index, values) {
              return value + ' PLN';
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
    { data: [], label: DirectionsChart.balance, type: 'line', yAxisID: 'y-axis-1', fill: false},
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
      this.operationsGroped = this.budgetApi.sortByDate(this.operationsGroped);

      this.budgetApi.balanceСalculation(this.operationsGroped, this.bank);

      this.setViewModel(this.operationsGroped);
      this.setDataInChart();
    }
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
  
  setViewModel(operations: Model[]) {
    this.viewModel = [];

    operations.forEach(operation => {
      this.viewModel.push({
        label: this.chartService.convertDateToString(
          operation.timestamp, this.currentFilter
        ),
        cashIn: operation.cashIn,
        cashOut: operation.cashOut,
        balance: operation.balance
      });
    });
  }

  grouping(typeFilter: string) {
    switch(typeFilter) {
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
