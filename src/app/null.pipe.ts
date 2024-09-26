import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null'
})
export class NullPipe implements PipeTransform {

  transform(value: number): number {
    return value === null ? 0 : value;
  }

}
