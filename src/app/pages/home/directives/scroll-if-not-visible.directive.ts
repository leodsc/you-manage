import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollIfNotVisible]'
})
export class ScrollIfNotVisibleDirective implements OnChanges {

  constructor(private el: ElementRef) { }

  @Input('currentPage')
  currentPage: number;

  ngOnChanges() {
    const elem = this.el.nativeElement as HTMLButtonElement;
    if (Number(elem.textContent) === this.currentPage) {
      elem.scrollIntoView();
    }
  }
}
