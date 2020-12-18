import { Injectable } from '@angular/core';
import {DateRange} from '../../date-range';

@Injectable({
  providedIn: 'root'
})
export class DatePeriodService {

  constructor() { }

  static getFirstAndLastDateOfCurrentMonth(presentDay: Date): DateRange {
    return new DateRange(
      new Date(presentDay.getFullYear(), presentDay.getMonth(), 1),
      new Date(presentDay.getFullYear(), presentDay.getMonth() + 1, 0)
    );
  }

  // rewrite
  getPeriod(direction: string, period: string): DateRange {
    switch (period) {
      case 'Week': {
        if (direction === 'Last') {
          return this.getLastWeek();
        }
        else if (direction === 'Current') {
          return this.getCurrentWeek();
        }
        else {
          return this.getNextWeek();
        }
      }
      case 'Month': {
        if (direction === 'Last') {
          return this.getLastMonth();
        }
        else if (direction === 'Current') {
          return this.getCurrentMonth();
        }
        else {
          return this.getNextMonth();
        }
      }
      case 'Quarter': {
        if (direction === 'Last') {
          return this.getLastQuarter();
        }
        else if (direction === 'Current') {
          return this.getCurrentQuarter();
        }
        else {
          return this.getNextQuarter();
        }
      }
    }
  }

  getCurrentQuarter(currentDate?: Date): DateRange {
    const current = currentDate ? currentDate : new Date();
    const quarter = Math.floor((current.getMonth() / 3));
    const first = new Date(current.getFullYear(), quarter * 3, 1);
    const last = new Date(first.getFullYear(), first.getMonth() + 3, 0);
    return new DateRange(first,last);
  }

  getLastQuarter(): DateRange {
    const initDate = new Date();
    return this.getCurrentQuarter(
      new Date(
        initDate.getFullYear(),
        initDate.getMonth() - 3,
        initDate.getDate()
      )
    );
  }

  getNextQuarter(): DateRange {
    const initDate = new Date();
    return this.getCurrentQuarter(
      new Date(
        initDate.getFullYear(),
        initDate.getMonth() + 3,
        initDate.getDate()
      )
    );
  }

  getCurrentWeek(currentDate?: Date): DateRange {
    const current = currentDate ? currentDate : new Date();
    const first = current.getDate() - current.getDay() + 1;
    const last = first + 6;

    return new DateRange(
      new Date(current.setDate(first)),
      new Date(current.setDate(last))
    );
  }

  getLastWeek(): DateRange {
    const initDate = new Date();
    return this.getCurrentWeek(
      new Date(
        initDate.getFullYear(),
        initDate.getMonth(),
        initDate.getDate() - 7
      )
    );
  }

  getNextWeek(): DateRange {
    const initDate = new Date();
    return this.getCurrentWeek(
      new Date(
        initDate.getFullYear(),
        initDate.getMonth(),
        initDate.getDate() + 7
      )
    );
  }

  getCurrentMonth(): DateRange {
    return DatePeriodService.getFirstAndLastDateOfCurrentMonth(new Date());
  }

  getLastMonth(): DateRange {
    const date = new Date();
    let month = date.getMonth() - 1;
    let year = date.getFullYear();

    if (month === 0) {
      month = 12;
      year -= 1;
      date.setFullYear(year);
    }
    date.setMonth(month);
    return DatePeriodService.getFirstAndLastDateOfCurrentMonth(date);
  }

  getNextMonth(): DateRange {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month === 13) {
      month = 1;
      year += 1;
      date.setFullYear(year);
    }
    date.setMonth(month);
    return DatePeriodService.getFirstAndLastDateOfCurrentMonth(date);
  }
}
