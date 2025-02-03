export function extractNumber(
  xmlData: any,
  key: string,
  context: string
): number {
  try {
    const value = xmlData["xbrli:xbrl"][key]?.find(
      (item: any) => item["$"].contextRef === context
    );
    return value ? parseInt(value["_"], 10) : 0;
  } catch (error) {
    return 0;
  }
}
