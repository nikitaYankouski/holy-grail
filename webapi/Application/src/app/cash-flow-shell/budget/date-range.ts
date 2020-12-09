export class DateRange {

  private _startDate: Date;

  get startDate(): Date {
    return this._startDate;
  }
  set startDate(value: Date) {
    this._startDate = value;
  }

  private _endDate: Date;

  get endDate(): Date {
    return this._endDate;
  }
  set endDate(value: Date) {
    this._endDate = value;
  }

  constructor(startDate?: Date, endDate?: Date) {
    this.startDate = null;
    this.endDate = null;

    this.init(startDate, endDate);
  }

  private init(startDate: Date, endDate: Date) {
    if (typeof startDate !== 'undefined' && typeof endDate !== 'undefined') {
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
}
