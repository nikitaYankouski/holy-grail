import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DateRange} from '../../date-range';
import {DatePipe} from '@angular/common';
import {Moment} from 'moment';
import * as moment from 'moment';
import {DaterangepickerComponent} from 'ngx-daterangepicker-material';
import {DatePeriodService} from './date-period.service';

const DATE_FORMAT_DATE_PIPE = 'd/MMM/y';
const DATE_FORMAT_MOMENT = 'D/MMM/YYYY';

@Component({
  selector: 'app-datepicker-dialog',
  templateUrl: './datepicker-dialog.component.html',
  styleUrls: ['./datepicker-dialog.component.scss']
})
export class DatepickerDialogComponent implements OnInit {

  viewInputStart: string;

  viewInputEnd: string;

  private _selectedRange: {
    startDate: Moment,
    endDate: Moment
  };


  get selectedRange(): { startDate: moment.Moment; endDate: moment.Moment } {
    return this._selectedRange;
  }

  set selectedRange(value: { startDate: moment.Moment; endDate: moment.Moment }) {
    this.offPeriod();
    this._selectedRange = value;
  }

  nameDirection: string = null;

  namePeriod: string = null;

  @ViewChild(DaterangepickerComponent, { static: false }) dateRangePickerComponent: DaterangepickerComponent;

  constructor(public datePeriodService: DatePeriodService,
              public datePipe: DatePipe,
              public dialogRef: MatDialogRef<DatepickerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dateStart: DateRange) { }

  ngOnInit(): void {
    this._selectedRange = {
      startDate: moment(this.dateStart.startDate),
      endDate: moment(this.dateStart.endDate)
    };

    this.viewInputStart = this.datePipe.transform(this.dateStart.startDate.toString(), DATE_FORMAT_DATE_PIPE);
    this.viewInputEnd = this.datePipe.transform(this.dateStart.endDate.toString(), DATE_FORMAT_DATE_PIPE);
  }

  selectDataRange(dateRange): void {
    this._selectedRange = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    };
  }

  selectOnCalendarStartDate(date): void {
    this._selectedRange.startDate = moment(date.startDate);
    this.viewInputStart = this.datePipe.transform(this._selectedRange.startDate.toDate(), DATE_FORMAT_DATE_PIPE);
    //this.viewInputEnd = '';
  }

  offPeriod(): void {
    if (this.nameDirection !== null && this.namePeriod !== null) {
      this.namePeriod = null;
      this.nameDirection = null;
    }
  }

  selectOnCalendarEndDate(date): void {
    this._selectedRange.endDate = moment(date.endDate);
    this.viewInputEnd = this.datePipe.transform(this._selectedRange.endDate.toDate(), DATE_FORMAT_DATE_PIPE);
  }

  enteringStartDateFromInput(date): void {
    this.displayDateInCalendar('start', date);
  }

  enteringEndDateFromInput(date): void {
    this.displayDateInCalendar('end', date);
  }

  closeDatepicker(typeButton: string): void {
    if (!(this.isValidDate(this.viewInputStart) && this.isValidDate(this.viewInputEnd))) {
    }

    this.selectDataRange({
      startDate: moment(this.viewInputStart),
      endDate: moment(this.viewInputEnd)
    });

    this.dialogRef.close(typeButton !== 'close' ?
      this._selectedRange : undefined);
  }

  chooseDirectionTime(nameDirection): void {
    this.nameDirection = nameDirection;
    if (this.namePeriod === null) {return;}
    this.updateCalendar(this.datePeriodService.getPeriod(this.nameDirection, this.namePeriod));
  }

  choosePeriod(namePeriod): void {
    this.namePeriod = namePeriod;
    if (this.nameDirection === null) {return;}
    this.updateCalendar(this.datePeriodService.getPeriod(this.nameDirection, this.namePeriod));
  }

  updateCalendar(newDateRange: DateRange): void {
    this.dateRangePickerComponent.setStartDate(newDateRange.startDate);
    this.dateRangePickerComponent.setEndDate(newDateRange.endDate);
    this.dateRangePickerComponent.updateView();
  }

  displayDateInCalendar(typeCalendar: string, enteredDate: string): string {
    const enteredDateMoment = moment(enteredDate).toDate().getTime();
    const startDate = this._selectedRange.startDate.toDate().getTime();
    const endDate = this._selectedRange.endDate.toDate().getTime();

    if (startDate === enteredDateMoment || endDate === enteredDateMoment) {
      return enteredDate;
    }

    if (this.isValidDate(enteredDate)) {
      if (typeCalendar === 'start') {
        this._selectedRange.startDate = moment(enteredDate);
        this.dateRangePickerComponent.setStartDate(this._selectedRange.startDate);
        this.dateRangePickerComponent.setEndDate(this._selectedRange.endDate);
      }
      if (typeCalendar === 'end') {
        this._selectedRange.endDate = moment(enteredDate);
        this.dateRangePickerComponent.setEndDate(this._selectedRange.endDate);
      }
      this.dateRangePickerComponent.updateView();
    }
    return enteredDate;
  }

  isValidDate(date: string): boolean {
    return moment(date, DATE_FORMAT_MOMENT, true).isValid();
  }
}
