import { Application } from 'pixi.js';

import { Graphics, Sprite, BaseTexture, Texture } from 'pixi.js';
import { Pixi1Service } from './../shared/services/pixi1.service';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderService, ploader2 } from '../shared/services/loader.service';
import { TimelineMax, TweenLite, TweenMax, SlowMo, SteppedEase, Bounce, Power0 } from 'gsap';
// declare var TimelineMax: any;
declare var PIXI: any;
declare var ExpoScaleEase: any;
declare var config: any;

@Component({
  selector: 'pixi-c3-sub3',
//   templateUrl: './pixi-c3.component.html',
template: `

<div class="sat-container">
  <section class="sat-section">
    <div class="sat-div" #orbit>
      <div class="sat-img" #sat>
      <img class="img" src="../../../../assets/img/sat.png" alt="" #img>
      </div>
    </div>
  </section>
</div>
`,
  styleUrls: ['./shared/style/pixi-c3-sat.scss'],
  providers: [
    LoaderService
  ]
})
export class PixiC3Sub3Component implements OnInit, AfterViewInit {

  @ViewChild('orbit') orbitRef: ElementRef;
  @ViewChild('sat') satRef: ElementRef;
  @ViewChild('img') imgRef: ElementRef;

  private orbit: ElementRef;
  private sat: ElementRef;
  private img: ElementRef;

    private graphics: Graphics = new PIXI.Graphics();
    private ticker = new PIXI.ticker.Ticker();
    private app: Application;
    appWidth: number;
    appHeight: number;
    private satellite: Sprite;

  constructor(private pixiServ: Pixi1Service,
              private loaderServ: LoaderService) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.orbit = this.orbitRef.nativeElement;
    this.sat = this.satRef.nativeElement;
    this.img = this.imgRef.nativeElement;

    this.pixiServ.subject.subscribe(this);
  }

  next(data) {
    this.appWidth = data.width;
    this.appHeight = data.height;
    this.app = data.app;

    // this.tweenMax();  
    this.init();
    // this.iniGraphics();
  }

  init() {
    let tLine = new TimelineMax({repeat:-1, repeatDelay:0});

    // tLine.to(this.sat, 8, {repeat: 10, rotation: -360, transformOrigin: '300px 300px'});
    tLine
      .set(this.orbit, {rotationX:60, zIndex:2})
      // .set(this.sat, {rotationX:-60})
      .set(this.sat, {rotation: 320, transformOrigin: '300px 300px'})
      // .set(this.img, {rotation: -320, rotationY:-60})

      // .set(this.sat, {rotation: 230, transformOrigin: '300px 300px'})
      // .set(this.img, {rotation: -230, rotationY:-60})
      // .set(this.img, {rotation:90, rotationX:-60})
      .add('begin-first')
      .fromTo(this.sat, 4, {rotation: 320,transformOrigin: '300px 300px', ease: Power0.easeNone},
       {rotation: 230, transformOrigin: '300px 300px', ease: Power0.easeNone}, 'begin-first')
      .add('begin-second')
      .fromTo(this.sat, 4, {rotation: 230,transformOrigin: '300px 300px', ease: Power0.easeNone},
      {rotation: 140, transformOrigin: '300px 300px', ease: Power0.easeNone}, 'begin-second')
      .add('begin-third')
      .fromTo(this.sat, 4, {rotation: 140,transformOrigin: '300px 300px', ease: Power0.easeNone},
      {rotation: 50, transformOrigin: '300px 300px', ease: Power0.easeNone}, 'begin-third')
      .add('begin-fourth')
      .fromTo(this.sat, 4, {rotation: 50,transformOrigin: '300px 300px', ease: Power0.easeNone},
      {rotation: -40, transformOrigin: '300px 300px', ease: Power0.easeNone}, 'begin-fourth')
      

      .fromTo(this.img, 4, {rotation: -320, rotationY:-60, ease: Power0.easeNone},
      {rotation: -230, rotationY:-60, ease: Power0.easeNone}, 'begin-first')
 
      .fromTo(this.img, 4, {rotation: -230, rotationY:-60, ease: Power0.easeNone},
      {rotation: -140, rotationY:-60, ease: Power0.easeNone}, 'begin-second')

      .fromTo(this.img, 4, {rotation: -140, rotationY:-60, ease: Power0.easeNone},
      {rotation: -50, rotationY:-60, ease: Power0.easeNone}, 'begin-third')

      .fromTo(this.img, 4, {rotation: -50, rotationY:-60, ease: Power0.easeNone},
      {rotation: 40, rotationY:-60, ease: Power0.easeNone}, 'begin-fourth')

      .fromTo(this.img, 4, {scale:0.6}, {scale:1.5, ease:ExpoScaleEase.config(0.6, 1.5)}, 'begin-first')
      .fromTo(this.img, 4, {scale:1.5}, {scale:0.6, ease:ExpoScaleEase.config(1.5, 0.6)}, 'begin-second')

      .fromTo(this.img, 4, {scale:0.6}, {scale:0.2, ease:ExpoScaleEase.config(0.6, 0.2)}, 'begin-third')
      .fromTo(this.img, 4, {scale:0.2}, {scale:0.6, ease:ExpoScaleEase.config(0.2, 0.6)}, 'begin-fourth')
   
      .to(this.orbit, 0, {zIndex:2}, 'begin-first')
      .to(this.orbit, 0, {zIndex:-2}, 'begin-third')
      
  }

}