export class LogClient {
  constructor() {}
  public info<T>(message: string, content: T): void {
    console.log("--------------------------------------");
    console.log(message);
    console.log(this.formatContent(content));
    console.log("--------------------------------------");
  }

  public error<T>(message: string, content: T, error?: Error | unknown): void {
    console.log("--------------------------------------");
    console.error(message);
    console.log(content);
    console.error(error);
  }

  private formatContent<T>(content: T): string {
    if (typeof content === "object" && content !== null) {
      return Object.entries(content)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    }
    return String(content);
  }
}
