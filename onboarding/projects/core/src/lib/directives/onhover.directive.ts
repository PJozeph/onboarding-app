import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onHover]'
})
export class OnHoverDirective {

  private currentColor : string;

  constructor(private elementRef: ElementRef) {}
  
  @HostListener('mouseenter') onMouseEnter() {
    this.currentColor = this.elementRef.nativeElement.style.backgroundColor;
    this.elementRef.nativeElement.style.backgroundColor = '#9fa8cb' ;
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.backgroundColor = this.currentColor
  }

}
