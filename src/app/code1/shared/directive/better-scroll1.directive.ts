import { Directive, Input, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[BScroll1]'
})
export class BetterScroll1Directive {

  @Input('addClass') ClassToAdd: string;
  @Input('removeClass') ClassToRemove: string;
  @Input('offsetIn') OffsetIn: number = 2;
  @Input('offsetOut') OffsetOut: number = 2;


  constructor(private elRef: ElementRef,
              private el: Renderer2) { 
                
              }

  addClass(el) {
    el.classList.add(this.ClassToAdd);
  }

  removeClass(el) {
    el.classList.remove('back1--img_show');
  }

  @HostListener('click')
  onclick() {
    console.log('clicked');
    
  }

  @HostListener('window: scroll')
  onscroll() {
    let el = this.elRef.nativeElement;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const bottomPosition = window.scrollY + window.innerHeight;

    // const elCenter = bottomPosition - (el.offsetHeight / 2);
    const elBottomAtTop = el.offsetTop + el.offsetHeight
    // const elCenterAtTop = el.offsetTop + (el.offsetHeight/2)
    // const el3rdAtTop = el.offsetTop + (el.offsetHeight)
    const elOut = el.offsetTop + (el.offsetHeight/this.OffsetOut)

    const elTopAtBot = el.offsetTop - window.innerHeight
    // const elCenterAtBot = elTopAtBot + (el.offsetHeight/2)
    // const el3rdAtBot = elTopAtBot + (el.offsetHeight/4)
    const elIn = elTopAtBot + (el.offsetHeight/this.OffsetIn); 
    
    const isHalfShown = window.scrollY > elIn;
    const notScrollPased = window.scrollY < elOut;
    // const isHalfShown = window.scrollY > elCenterAtBot;
    // const notScrollPased = window.scrollY < elCenterAtTop;
    
    // const elArr = Array.from(el.children);
    console.log('this.ClassToAdd');

    if(isHalfShown && notScrollPased) {
      // console.log(el.children[1]);
      // this.addClass(el)
      // this.parallax(el);
      // console.log(elCenter);
    }else{
      // this.removeClass(el);
    }

  }

}
