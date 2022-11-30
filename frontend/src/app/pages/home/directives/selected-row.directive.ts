import { Directive, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[appSelectedRow]'
})
export class SelectedRowDirective {


  @Input('rows')
  rows: number[] = [];

  constructor() { }

}
