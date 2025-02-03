export class Utils {
  public isYYYYMMDD(date: string) {
    const regex = new RegExp(/^\d{4}\d{2}\d{2}$/);
    return regex.test(date);
  }

  public isYYYYMMDDWithHyphen(date: string) {
    const regex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    return regex.test(date);
  }
}
