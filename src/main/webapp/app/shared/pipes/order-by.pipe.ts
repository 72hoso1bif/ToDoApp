import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === null) {
      return;
    }
    return value.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
  }

}
