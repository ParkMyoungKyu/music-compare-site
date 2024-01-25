export class DateUtils {
  date: string;
  format: string;

  constructor() {
    this.date = new Date().toString();
    this.format = 'YYYYMMDD';
  }

  public dateformat(date: string, format: string): string {
    if (format.length == 8) {
      console.log(
        date.substring(0, 4) + date.substring(0, 4) + date.substring(0, 4),
      );
    } else if (format.length == 6) {
      console.log(
        date.substring(0, 4) + date.substring(0, 4) + date.substring(0, 4),
      );
    } else if (format.length == 14) {
      console.log(
        date.substring(0, 4) + date.substring(0, 4) + date.substring(0, 4),
      );
    }
    return date.substring(0, 4);
  }
}

export default DateUtils;
