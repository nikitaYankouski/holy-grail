import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRange} from '../date-range';
import {MatDialog} from '@angular/material/dialog';
import {DatepickerDialogComponent} from './datepicker-dialog/datepicker-dialog.component';
import {DatePeriodService} from './datepicker-dialog/date-period.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit{

  readonly DATE_FORMAT: string = 'MMM d, y';

  private _filterDateRange: DateRange;

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.enteringFilterDateRange.emit(this.filterDateRange);
  }

  @Output() enteringFilterDateRange = new EventEmitter<DateRange>();

  private _refresh: boolean;

  get refresh(): boolean {
    return this._refresh;
  }

  @Input() set refresh(value: boolean) {
    if (typeof value !== 'undefined') {
      this.enteringFilterDateRange.emit(this.filterDateRange);
    }
  }

  constructor(
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filterDateRange = DatePeriodService.initCurrentDatePeriod(new Date());
  }

  openDatePicker(): void {
    const dialogRef = this.dialog.open(DatepickerDialogComponent, {
      width: '830px',
      height: '430px',
      backdropClass: 'backdropBackground',
      hasBackdrop: true,
      position: {
        top: '7.5%',
        left: '0.7%'
      },
      data: this.filterDateRange
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result !== 'undefined') {
        this.filterDateRange = result;
      }
    });
  }
}
