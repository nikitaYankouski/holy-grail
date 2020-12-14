import {Component, Directive, ElementRef, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateRange} from '../../date-range';
import {DatePipe} from '@angular/common';
import {Moment} from 'moment';
import * as moment from 'moment';
import {DaterangepickerComponent, DaterangepickerDirective} from 'ngx-daterangepicker-material';
import {AbstractControl, FormControl} from '@angular/forms';
import {BudgetService} from '../../budget.service';

const DATE_FORMAT: string = 'd/MMM/y';

@Component({
  selector: 'app-datepicker-dialog',
  templateUrl: './datepicker-dialog.component.html',
  styleUrls: ['./datepicker-dialog.component.scss']
})
export class DatepickerDialogComponent implements OnInit {

  private _viewInputStart: string;

  private _viewInputEnd: string;

  month: string;

  period: string;

  selected: {
    startDate: Moment,
    endDate: Moment
  };

  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  constructor(public datePipe: DatePipe,
              public dialogRef: MatDialogRef<DatepickerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dateStart: DateRange) { }

  ngOnInit(): void {
    this.selected = {
      startDate: moment(this.dateStart.startDate),
      endDate: moment(this.dateStart.endDate)
    };

    this.viewInputStart = this.datePipe.transform(this.dateStart.startDate.toString(), DATE_FORMAT);
    this.viewInputEnd = this.datePipe.transform(this.dateStart.endDate.toString(), DATE_FORMAT);

    const checkDate = new DateRange(this.selected.startDate.toDate(), this.selected.endDate.toDate());

    switch (checkDate.startDate.getTime()) {
      case this.getLastMonth().startDate.getTime(): {
        if (checkDate.endDate.getTime() === this.getLastMonth().endDate.getTime()) {
          this.month = 'Last';
        }
        break;
      }
      case this.getCurrentMonth().startDate.getTime(): {
        if (checkDate.endDate.getTime() === this.getCurrentMonth().endDate.getTime()) {
          this.month = 'Current';
        }
        break;
      }
      case this.getNextMonth().startDate.getTime(): {
        if (checkDate.endDate.getTime() === this.getNextMonth().endDate.getTime()) {
          this.month = 'Next';
        }
        break;
      }
    }
  }

  setDataRange(event): void {
    this.selected = {
      startDate: event.startDate,
      endDate: event.endDate
    };
  }

  setStartDate(event) {
    this.selected.startDate = moment(event.startDate);
    this.viewInputStart = this.datePipe.transform(this.selected.startDate.toDate(), DATE_FORMAT);
  }

  setEndDate(event) {
    this.selected.endDate = moment(event.endDate);
    this.viewInputEnd = this.datePipe.transform(this.selected.endDate.toDate(), DATE_FORMAT);
  }

  closeDatepicker(typeButton?: string): void {
    this.setDataRange({
      startDate: moment(this.viewInputStart),
      endDate: moment(this.viewInputEnd)
    });
    this.dialogRef.close(typeButton !== 'close' ?
      this.selected : undefined);
  }

  chooseMonth(month: string): void {
    this.month = month;

    switch (month) {
      case 'Last': {
        this.setDataFoo(this.getLastMonth());
        break;
      }
      case 'Current': {
        this.setDataFoo(this.getCurrentMonth());
        break;
      }
      case 'Next': {
        this.setDataFoo(this.getNextMonth());
        break;
      }
    }
  }

  choosePeriod(period: string): void {
    this.period = period;

    switch (period) {
      case 'Week': {
        break;
      }
      case 'Month': {
        break;
      }
      case 'Quarter': {
        break;
      }
    }
  }

  getLastMonth(): DateRange {
    let dateBuff = new Date();
    let month = dateBuff.getMonth() - 1;
    let year = dateBuff.getFullYear();
    if (month === 0) {
      month = 12;
      year -= 1;
      dateBuff.setFullYear(year);
    }
    dateBuff.setMonth(month);
    return BudgetService.getFirstAndLastDateOfCurrentMonth(dateBuff);
  }

  getCurrentMonth(): DateRange {
    return BudgetService.getFirstAndLastDateOfCurrentMonth(new Date());
  }

  getNextMonth(): DateRange {
    let dateBuff = new Date();
    let month = dateBuff.getMonth() + 1;
    let year = dateBuff.getFullYear();
    if (month === 13) {
      month = 1;
      year += 1;
      dateBuff.setFullYear(year);
    }
    dateBuff.setMonth(month);
    return BudgetService.getFirstAndLastDateOfCurrentMonth(dateBuff);
  }

  setDataFoo(date: DateRange): void {
    this.setDataRange({
      startDate: moment(date.startDate),
      endDate: moment(date.endDate)
    });
    this.viewInputStart = this.datePipe.transform(date.startDate.toString(), DATE_FORMAT);
    this.viewInputEnd = this.datePipe.transform(date.endDate.toString(), DATE_FORMAT);
  }

  get viewInputStart(): string {
    return this._viewInputStart;
  }

  set viewInputStart(value: string) {
    this._viewInputStart = value;
  }

  get viewInputEnd(): string {
    return this._viewInputEnd;
  }

  set viewInputEnd(value: string) {
    this._viewInputEnd = value;
  }
}
