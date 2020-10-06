import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChange } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Operation } from '../table/operation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit {
  private _operations = [];

  @Input() set operations(value: Operation[]) {
    this._operations = value;
  } 

  get operations(): Operation[] {
    return this._operations;
  }

  dataBalance: number[];

  labelDate: string[];

  cashIn: number[];

  cashOut: number[];

  operationsDifferMap = new Map<number, any>();

  operationMap = new Map<number, Operation>();

  public barChartType: ChartType = 'bar';

  public barChartLegend = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  public barChartData: ChartDataSets[];

  public barChartLabels: Label[];

  public barChartPlugins = [pluginDataLabels];

  constructor() {}

  ngOnInit(): void {
    this.barChartData = [
      { data: [], label: 'BALANCE', type: 'line' },
      { data: [], label: 'CASH IN' },
      { data: [], label: 'CASH OUT' },
    ];
    this.barChartLabels = [];

    this.dataBalance = [];
    this.labelDate = [];
  }

  ngOnChanges(changes: SimpleChange) { // !
    this.refreshDataInChart();
  }

  refreshDataInChart() {
    if (this.operations != null) { // !==
      this.getDataFromOperations();
      this.setDataInChart();
      this.setLabelInChart();
    }
  }

  setDataInChart() {
    let rowBalance = this.barChartData.find(it => it.label === 'BALANCE');
    rowBalance.data = this.dataBalance;
    
    let rowCashIn = this.barChartData.find(it => it.label === 'CASH IN');
    rowCashIn.data = this.cashIn;

    let rowCashOut = this.barChartData.find(it => it.label === 'CASH OUT');
    rowCashOut.data = this.cashOut;
  }

  setLabelInChart() {
    this.barChartLabels = this.labelDate;
  }

  getDataFromOperations() {
    this.dataBalance = [];
    this.labelDate = [];
    this.cashIn = [];
    this.cashOut = [];

    this.operations.forEach(operation => {
      this.dataBalance.push(operation.balance);
      this.labelDate.push(operation.timestamp);
      
      if (operation.isIncome) {
        this.cashIn.push(operation.amountOfMoney);
        this.cashOut.push(null);
      }
      else {
        this.cashOut.push(operation.amountOfMoney);
        this.cashIn.push(null);
      }
    });
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
