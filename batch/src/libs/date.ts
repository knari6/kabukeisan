export class DateUtil {
  public static getToday(): Date {
    return new Date();
  }

  public static getISODate(): string {
    return new Date().toISOString();
  }

  /**
   * YYYYMMDDを取得
   * @param date
   * @returns
   */
  public static getYYYYMMDD(date: Date): string {
    const month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear().toString() + month + day;
  }

  /**
   * YYYY-MM-DDを取得
   * @param date
   * @returns
   */
  public static getYYYYMMDDWithHyphens(date: Date): string {
    return this.getYYYYMMDD(date).replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
  }

  /**
   * YYYY-MM-DDの文字列をDate型に変換
   * @param dateString
   * @returns
   */
  public static getDate(dateString: string): Date {
    return new Date(dateString);
  }

  public static argToDate(arg: string): Date {
    return new Date(
      parseInt(arg.substring(0, 4), 10),
      parseInt(arg.substring(4, 6), 10) - 1,
      parseInt(arg.substring(6, 8), 10)
    );
  }

  /**
   * 毎日日付を指定するため
   * @param startDate
   * @param endDate
   */

  public static *dateRange(startDate: Date, endDate: Date) {
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      yield currentDate;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  public isYYYYMMDD(date: string) {
    const regex = new RegExp(/^\d{4}\d{2}\d{2}$/);
    return regex.test(date);
  }

  public isYYYYMMDDWithHyphen(date: string) {
    const regex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    return regex.test(date);
  }
}
