import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { TweenMax } from 'gsap';
declare var TweenMax;
// declare var SplitText;

@Component({
  selector: 'anim-lib-gsap1',
  templateUrl: './gsap1.component.html',
  styleUrls: ['./gsap1.component.scss']
})
export class Gsap1Component implements OnInit, AfterViewInit {

  @ViewChild('ssss') ssss: ElementRef;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // TweenMax.to(".box", 3, {x:300});
    // this.gsap();
  }

  gsap() {

    let textArr = Array.from('welcom');
    // console.log(s[3]);
    

    function random(min, max){
      return (Math.random() * (max - min)) + min;
    }

    textArr.forEach((text) => {
      return 
    });

    // split.chars.forEach((char, i) => {
    //   TweenMax.from(char , 2.5, {
    //     opacity: 0,
    //     x: random(-500, 500),
    //     y: random(-500, 500),
    //     z: random(-500, 500),
    //     scale: .1,
    //     delay: i * .02,
    //     yoyo: true,
    //     repeat: -1,
    //     repeatDelay: 10
    //   })
    // })
  }

}
