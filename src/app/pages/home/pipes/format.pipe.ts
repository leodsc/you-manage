import { formatCurrency, formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    switch (args[0]) {
      case "hiring":
        return formatDate(value, "mediumDate", navigator.language);
      case "birthday":
        return formatDate(value, "mediumDate", navigator.language);
      case "wage":
        return formatCurrency(value, navigator.language, "$")
      default:
        return value;
    }
  }

}
