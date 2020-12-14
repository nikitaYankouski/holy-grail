import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange } from '../date-range';
import {MatDialog} from '@angular/material/dialog';
import {DatepickerDialogComponent} from './datepicker-dialog/datepicker-dialog.component';
import {BudgetService} from '../budget.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent {

  readonly DATE_FORMAT: string = 'MMM d, y';

  private _filterDateRange: DateRange =
    BudgetService.getFirstAndLastDateOfCurrentMonth(new Date());

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.enteringFilterDateRange.emit(this._filterDateRange);
  }

  @Output() enteringFilterDateRange = new EventEmitter<DateRange>();

  constructor(
    public dialog: MatDialog) { }

  openDatePicker(): void {
    const dialogRef = this.dialog.open(DatepickerDialogComponent, {
      width: '55%',
      height: '58%',
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
