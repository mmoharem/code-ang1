import { element } from 'protractor';
import { Directive, Input, HostListener, HostBinding, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
 

@Directive({
  selector: '[appAnimate1]'
})
export class Animate1Directive implements OnInit {

  isHidden: boolean;
  

  @Input('addClass') ClassToAdd: string;
  @Input('removeClass') ClassToRemove: string;
  @Input('offsetIn') OffsetIn: number = 2;
  @Input('offsetOut') OffsetOut: number = 2;

  // @Input() classThatTriggersAnimation = "do-animation";
  
  // @Output()
  @Input('classT') classTrigger;
  @Input('classT2') classTrigger2;
  @Input('animation') animation: string;
  @HostBinding('@scrollRevealR') animationTriggerR = 'hideR'; 
  @HostBinding('@scrollRevealL') animationTriggerL = 'hideL';
  // if(animation){
  //   console.log('animation');
  // } 
 
  
  @HostBinding('style.transform') transform;
  

  constructor(private elRef: ElementRef,
              private el: Renderer2) { }

  ngOnInit() {
    // console.log(this.elRef.nativeElement.parentNode.parentNode.parentNode);
    // console.log(this.el);
    // this.elRef.nativeElement.parentNode.parentNode.parentNode.addEventListener("click", this.myFunction.bind(this));
    console.log(this.animation);
    
  }

  addClass(el) {
    // el.classList.add(this.ClassToAdd);
  }

  removeClass(el) {
    // el.classList.remove('back1--img_show');
  }

  
  myFunction(){
    console.log('clicked');
    
    // this.animationTrigger = 'show';
  }

  myEl = this.elRef.nativeElement.parentNode.parentNode;

  
  // }
  // @HostListener('mouseenter') mouseenter(eventData: Event) {
  //   this.animationTrigger = 'show';
  //   console.log('enter');
    

  // }
  // @HostListener('mouseleave') mouseleave(eventData: Event) {
  //   this.animationTrigger = 'hide';
  //   console.log('leave'); 
  // }



  @HostListener('window: scroll')
  onscroll() {
    

    const calcParentEl = () => {
      let el = this.elRef.nativeElement.parentNode.parentNode.parentNode;

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
      // console.log('this.ClassToAdd');
      if(isHalfShown && notScrollPased) {
        
        this.animationTriggerL = this.classTrigger;
        this.animationTriggerR = this.classTrigger;
      }else{
        this.animationTriggerL = this.classTrigger2;
        this.animationTriggerR = this.classTrigger2;
      }
    }
    
    calcParentEl();

    const calcEl = () => {

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
      // const elIn = elTopAtBot + (el.offsetHeight/this.OffsetIn); 
      const elIn = elTopAtBot + el.offsetHeight;

      const isHalfShown = window.scrollY > elIn;
      const isShown = window.scrollY >= elIn;
      const notScrollPased = window.scrollY < elOut;
      // const isHalfShown = window.scrollY > elCenterAtBot;
      // const notScrollPased = window.scrollY < elCenterAtTop;

      if(isShown && notScrollPased) {
        // console.log(el.children[1]);
        // this.addClass(el)
        // this.parallax(el);
        // this.transform = 'translateY(900px)';
        // el.style.backgroundColor = 'red';
        el.style.top = `${(window.scrollY - elIn) * 0.3}px`;
        // el.style.transform = `translateY(${(window.scrollY - elIn) * 0.1}px)`;
      }else{
        // this.removeClass(el);
      }
    }

    // calcEl();

  }

}
