import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appRenderDatepicker]'
})
export class RenderDatepickerDirective implements OnInit {

  private datepicker: HTMLElement;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.datepicker = this.elementRef.nativeElement.getElementsByClassName('md-drppicker')[0];
    this.renderer.setStyle(this.datepicker, 'box-shadow', 'unset');
  }
}
