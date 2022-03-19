import {SelectItem} from "primeng/api";

export class OptionsUtils{

  public static getOptions(enumeration: any): SelectItem[] {
    const options: SelectItem[] = [];
      options.push({
        label: "Selecione",
        value: null
      });

    for(const option in enumeration){
      options.push({
        label: enumeration[option],
        value: option
      });
    };
    return options;
  }
}
