
import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appScroll1]'
})
export class Scroll1Directive {
  // @Input('speed') speed

  constructor(private elRef: ElementRef,
              private el: Renderer2) { }

  addClass(el) {
    el.children[1].classList.add('objects--pens_show');
    el.children[2].classList.add('objects--paper_show');
    el.children[3].classList.add('objects--plant_show');
    el.children[4].classList.add('objects--tablet_show');
    el.children[5].classList.add('objects--styles_show');
  }

  removeClass(el) {
    el.children[1].classList.remove('objects--pens_show');
    el.children[2].classList.remove('objects--paper_show');
    el.children[3].classList.remove('objects--plant_show');
    el.children[4].classList.remove('objects--tablet_show');
    el.children[5].classList.remove('objects--styles_show');
  }

  parallax(el) {
    el.children[1].style.transform = `translateY(${((window.scrollY + 1) - (window.scrollY - 1))}rem)`;
    el.children[2].style.transform = `translateY(${window.scrollY * 0.1}rem)`
    // el.children[3].style.top = window.scrollY * 0.01;
    // el.children[4].style.top = window.scrollY * 0.01;
    // el.children[5].style.top = window.scrollY * 0.01;
  }

  @HostListener('click')
  onclick() {
    this.addClass(this.elRef.nativeElement);
  }

  @HostListener('window: scroll')
  onscroll() {

    let el = this.elRef.nativeElement;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const bottomPosition = window.scrollY + window.innerHeight;

    // const elCenter = bottomPosition - (el.offsetHeight / 2);
    const elBottomAtTop = el.offsetTop + el.offsetHeight
    const elCenterAtTop = el.offsetTop + (el.offsetHeight/2)
    const el3rdAtTop = el.offsetTop + (el.offsetHeight)

    const elTopAtBot = el.offsetTop - window.innerHeight
    const elCenterAtBot = elTopAtBot + (el.offsetHeight/2)
    const el3rdAtBot = elTopAtBot + (el.offsetHeight/4)
    
    const isHalfShown = window.scrollY > el3rdAtBot;
    const notScrollPased = window.scrollY < el3rdAtTop;
    // const isHalfShown = window.scrollY > elCenterAtBot;
    // const notScrollPased = window.scrollY < elCenterAtTop;
    
    // const elArr = Array.from(el.children);

    if(isHalfShown && notScrollPased) {
      // console.log(el.children[1]);
      // this.addClass(el);
      // this.parallax(el);
      // console.log(elCenter);
    }else{
      // this.removeClass(el);
    }

    // console.log(el.children)

    // console.log('------------------------');
    // console.log('bottomPosition: ' +bottomPosition);
    // console.log('window.innerHeight: ' +window.innerHeight);
    // console.log('el.offsetHeight: ' + el.offsetHeight);
    // console.log('el.offsetTop: ' +el.offsetTop);
    // console.log('window.scrollY: ' +window.scrollY);

    // console.log('window.innerHeight: ' + window.innerHeight);
    // console.log('window.scrollY: ' + window.scrollY);
    // console.log('window.pageYOffset: ' + window.pageYOffset);  
    // console.log('bottomPosition: ' + bottomPosition);  
    // console.log('scrollHeight: ' + scrollHeight);  
    // console.log('document.documentElement.scrollHeight: ' + document.documentElement.scrollHeight);  
    // console.log('elCenter: ' + elCenter);  
    // console.log('elBottom: ' + elBottom); 
  }

}
