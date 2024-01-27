export enum DateFormat {
  yyyymmddHHmmss,
  yyyymmdd,
  mmdd,
  HHmmss,
}

export class DateUtils {
  date: string;
  format: string;

  constructor() {
    this.date = new Date().toString();
    this.format = 'YYYYMMDD';
  }

  public dateformat(date: string, format: DateFormat): string {
    let Returndate = date;
    if (format == DateFormat.yyyymmddHHmmss) {
      Returndate =
        date.substring(0, 4) +
        '-' +
        date.substring(4, 6) +
        '-' +
        date.substring(6, 8) +
        ' ' +
        date.substring(8, 10) +
        ':' +
        date.substring(10, 12) +
        ':' +
        date.substring(12, 14);
    } else if (format == DateFormat.yyyymmdd) {
      Returndate =
        date.substring(0, 4) +
        '-' +
        date.substring(4, 6) +
        '-' +
        date.substring(6, 8);
    } else if (format == DateFormat.mmdd) {
      Returndate = date.substring(0, 2) + '-' + date.substring(2, 4);
    } else if (format == DateFormat.HHmmss) {
      Returndate =
        date.substring(0, 2) +
        ':' +
        date.substring(2, 4) +
        ':' +
        date.substring(4, 6);
    }
    return Returndate;
  }
}

export default DateUtils;
