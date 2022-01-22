import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';

import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { saveAs } from 'file-saver';

import {ChartService} from '../services/chart.service';
import {Operation} from '../../../../operation';

import {Filter} from '../services/filter/filter';
import {FilterDay} from '../services/filter/filter-day';
import {FilterMonth} from '../services/filter/filter-month';
import {FilterYear} from '../services/filter/filter-year';
import {NoFilter} from '../services/filter/no-filter';
import {ViewOperationChart} from '../view-operation-chart';

import {BaseChartDirective} from 'ng2-charts';
import {BudgetService} from '../../../budget.service';
import {CrudOperation} from '../../../crud-operation';
import * as FileSaver from 'file-saver';

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

const crudType = {
  create: 'create',
  update: 'update',
  delete: 'delete'
};

const nameOfColumns = "id,description,timestamp,InOut,balance";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {

  private _bank = 0;

  get bank(): number {
    return this._bank;
  }

  @Input() set bank(value: number) {
    this._bank = value;
  }

  private _filteredOperationsByDate: Operation[];

  get filteredOperationsByDate(): Operation[] {
    return this._filteredOperationsByDate;
  }

  @Input() set filteredOperationsByDate(value: Operation[]) {
    this._filteredOperationsByDate = value;
    this.refreshDataInChart(this.currentGroupFilter);
  }

  private _operationCRUD: CrudOperation;

  get operationCRUD() {
    return this._operationCRUD;
  }

  @Input() set operationCRUD(value: CrudOperation) {
    this._operationCRUD = value;
    this.crud(this.operationCRUD);
  }

  groupedOperations: Operation[];

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

  currentGroupFilter: Filter = new NoFilter();

  @ViewChild(BaseChartDirective) private _chart;

  constructor(
    private chartService: ChartService,
    private budgetService: BudgetService
  ) { }

  refreshDataInChart(typeGroupFilter: Filter): void {
    if (typeof this.filteredOperationsByDate !== 'undefined') {
      this.groupedOperations = typeGroupFilter instanceof NoFilter ?
        this.chartService.castToNewArray(this.filteredOperationsByDate) :
        this.chartService.toGroupOperations(
          this.chartService.castToNewArray(this.filteredOperationsByDate), typeGroupFilter
        );

      this.groupedOperations = this.budgetService.sortByDate(this.groupedOperations);

      this.groupedOperations = this.budgetService.calculateBalance(this.groupedOperations, this.bank);

      this.viewOperations = this.chartService.castToView(this.groupedOperations, this.currentGroupFilter);

      this.setDataInChart(this.viewOperations);

      this.chartRefresh(this.viewOperations);
    }
  }

  crud(crudOperation: CrudOperation): void {
    if (typeof crudOperation !== 'undefined') {
      if (crudOperation.type === crudType.update) {
        this.filteredOperationsByDate.forEach(operation => {
          if (operation.id === crudOperation.operation.id) {
            operation = crudOperation.operation;
          }
        });
      }

      if (crudOperation.type === crudType.delete) {
        this.filteredOperationsByDate = this.filteredOperationsByDate
          .filter(operation => operation.id !== crudOperation.operation.id);
      }
    }
    this.refreshDataInChart(this.currentGroupFilter);
  }

  chooseGroupFilter(groupFilter: string): void {
    this.currentGroupFilter = filterType[groupFilter];
    this.refreshDataInChart(this.currentGroupFilter);
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

  getImageChart(): void {
    const link = document.createElement('a');
    link.href = this._chart.toBase64Image();
    link.download = 'chart.png';
    link.click();
  }

  getCSV(): void {
    let operationsToCSV = ""; 
    this.groupedOperations.forEach(it =>  {
      const inOut = typeof it.cashIn !== 'undefined' ? "1" : "0";
      const transaction = it.id + "," + it.description + "," + it.timestamp + "," + inOut + "," +  it.balance + "\n";
      operationsToCSV = operationsToCSV.concat(transaction);
    });
    var blob = new Blob([nameOfColumns + "\n", operationsToCSV], {type: "text/csv;charset=utf-8"});
    FileSaver.saveAs(blob, "data.csv");
  }
  // id,description,timestamp,InOut,balance
}
