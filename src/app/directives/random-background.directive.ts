import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[randomBackground]'
})
export class RandomBackgroundDirective implements OnInit {

  @Input()
  backgrounds: any;

  windowType: "mobile" | "desktop";
  backgroundIndex = Math.floor(Math.random()*3);

  @HostListener("window:resize", [ "$event" ])
  onResize($event: any) {
    this.loadBackground();
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.loadBackground();
  }

  loadBackground() {
    this.changeWindowType();
    this.changeBackground();
  }

  changeWindowType() {
    if (window.innerWidth < 650) {
      this.windowType = "mobile";
    } else {
      this.windowType = "desktop";
    }
  }

  changeBackground() {
    const image = this.backgrounds[this.windowType][this.backgroundIndex];
    const url = `url(../../assets/${this.windowType}/${image}.jpeg)`;
    this.renderer.setStyle(this.el.nativeElement, "background-image", url);
  }
}
