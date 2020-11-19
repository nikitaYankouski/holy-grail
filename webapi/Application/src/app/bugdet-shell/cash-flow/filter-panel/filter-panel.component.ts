import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateRange } from '../date-range';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  private _filterDateRange: DateRange;

  get filterDateRange(): DateRange {
    return this._filterDateRange;
  }
  set filterDateRange(value: DateRange) {
    this._filterDateRange = value;
    this.enteringFilterDateRange.emit(this._filterDateRange);
  }

  private _minMaxDatepicker: DateRange;
  get minMaxDatepicker(): DateRange {
    return this._minMaxDatepicker;
  }
  @Input() set minMaxDatepicker(value: DateRange) {
    this._minMaxDatepicker = value;
  }

  @Output() enteringFilterDateRange = new EventEmitter<DateRange>();

  constructor() { }

  ngOnInit(): void { }

  passFilterDateRange(dateRange: DateRange) {
    this.filterDateRange = dateRange;
  }

}
