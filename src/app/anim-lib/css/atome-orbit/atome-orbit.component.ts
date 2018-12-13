import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TimelineMax, TweenMax } from "gsap";
// declare var TimelineMax: any;

@Component({
  selector: 'css-atome-orbit1',
  templateUrl: './atome-orbit.component.html',
  styleUrls: ['./atome-orbit.component.scss']
})
export class AtomeOrbitComponent implements OnInit, AfterViewInit {

  @ViewChild('orbit') orbitRef: ElementRef;
  @ViewChild('electron') electRef: ElementRef;
  

  orbit: HTMLElement = null;
  elect: HTMLElement = null;
  

  constructor() { }

  ngOnInit() {
    this.orbit = this.orbitRef.nativeElement;
    this.elect = this.electRef.nativeElement;
  }

  ngAfterViewInit() {
    console.log(this.orbit);
    
    let tl = new TimelineMax();

    this.orbit.style.backgroundColor = 'red';

    TweenMax.set(this.orbit, {perspective:500});

    tl
      // .from(this.elect, 1, {rotation:0, x: 100})
      // .fromTo(this.elect, 10, {left: 200, rotateZ: "0deg"}, {left: 200, rotationZ: "360deg"});
      .to(this.elect, 6, {transformOrigin:"100% 0%", rotation:360});
      // .to(this.atom, 1, {x: 300})
      // .to(this.elect, 1, {x: 100});
      // .play(0);
  }


}
