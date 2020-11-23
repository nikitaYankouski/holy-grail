import {Component, Output, EventEmitter, Input} from '@angular/core';
import { ViewChild, OnInit} from '@angular/core';

import { Moment } from 'moment';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange } from '../../date-range';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  selectedRangeNgx: {
    startDate: Moment,
    endDate: Moment
  };

  selectedRangeAng = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  minDate: Moment;

  maxDate: Moment;

  private _minMaxDate: DateRange;

  get minMaxDate(): DateRange {
    return this._minMaxDate;
  }
  @Input() set minMaxDate(value: DateRange){
    this.minDate = moment(value.startDate, 'MM/DD/YYYY');
    this.maxDate = moment(value.endDate, 'MM/DD/YYYY');
    this._minMaxDate = value;
  }

  @Output() dateRange = new EventEmitter<DateRange>();

  @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;

  constructor() { }

  ngOnInit(): void { }

  inputDateNgx(event: Object) {
    if (typeof this.selectedRangeNgx !== 'undefined') {
      this.dateRange.emit({
        startDate: this.selectedRangeNgx.startDate.toDate(),
        endDate: this.selectedRangeNgx.endDate.toDate()}
      );
    }
  }

  inputDateAng(event: Event) {
    if (typeof this.selectedRangeAng !== 'undefined') {
      console.log(this.selectedRangeAng.value.start);
      this.dateRange.emit({
        startDate: this.selectedRangeAng.value.start,
        endDate: this.selectedRangeAng.value.end}
      );
    }
  }

  clear() {
    this.dateRange.emit(undefined);
    this.selectedRangeNgx = undefined;

  }
}
