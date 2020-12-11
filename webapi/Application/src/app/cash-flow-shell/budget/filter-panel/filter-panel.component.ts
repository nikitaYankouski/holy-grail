import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange } from '../date-range';
import {MatDialog} from '@angular/material/dialog';
import {DatepickerDialogComponent} from './datepicker-dialog/datepicker-dialog.component';
import {Operations} from '../../operations';
import {FilterPanelService} from './filter-panel.service';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  readonly DATE_FORMAT: string = 'MMM d, y';

  private _filterDateRange: DateRange =
    this.filterPanelService.getFirstAndLastDateOfCurrentMonth(new Date());

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }

  set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.enteringFilterDateRange.emit(this._filterDateRange);
  }

  @Output() enteringFilterDateRange = new EventEmitter<DateRange>();

  constructor(
    public dialog: MatDialog,
    private filterPanelService: FilterPanelService) { }

  ngOnInit(): void {
  }

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
