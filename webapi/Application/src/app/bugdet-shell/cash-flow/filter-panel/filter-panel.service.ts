import { Injectable } from '@angular/core';
import {DateRange} from '../date-range';

@Injectable({
  providedIn: 'root'
})
export class FilterPanelService {

  constructor() { }

  getFirstAndLastDateOfCurrentMonth(lastDate: Date): DateRange {
    return new DateRange(
      new Date(lastDate.getFullYear(), lastDate.getMonth(), 1),
      new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 0)
    );
  }
}
