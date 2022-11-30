import { Directive, ElementRef, HostListener, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[verticallyFixed]'
})
export class VerticallyFixedDirective implements OnChanges {

  @Input('scrolled')
  scrolled: number;

  accumulated = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.accumulated > 2) {
      this.renderer.setStyle(this.el.nativeElement, "top", `${this.scrolled}px`);
      this.accumulated = 0;
    } else {
      this.accumulated = this.scrolled;
    }
  }
}
