export class SuggestionsUtils {
  public static filter(enumeration: any, query: string): any[] {
    const values: any = [];
    for (const option in enumeration) {
      if (enumeration[option]?.toString().toLowerCase().includes(query.toLowerCase())) {
        values.push(enumeration[option]);
      }
    }
    return values;
  }
}
