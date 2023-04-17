import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(value: any): Date {
    if (isNaN(value)) {
      return value;
    }
    
    const date = new Date(value * 26.363 );
    
    return date;
  }

}
