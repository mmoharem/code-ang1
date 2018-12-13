import { Application } from 'pixi.js';

import { Graphics, Sprite, BaseTexture, Texture } from 'pixi.js';
import { Pixi1Service } from './../shared/services/pixi1.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { LoaderService, ploader2 } from '../shared/services/loader.service';
import { Subscription } from 'rxjs';
import { Power0 } from 'gsap';
// import { TimelineMax } from 'gsap';
declare var TimelineMax: any;
declare var ExpoScaleEase: any;
declare var PIXI: any;

@Component({
  selector: 'pixi-c3-sub2',
//   templateUrl: './pixi-c3.component.html',
template: '',
// `
// <div class="my-container">
//   <section class="sat-section">
//     <div class="sat-div">
//       <img class="sat-img" src="../../../../assets/img/sat.png" alt="">
//     </div>
//   </section>
// </div>
// `,
  styleUrls: ['./pixi-c3.component.scss'],
  providers: [
    LoaderService
  ]
})
export class PixiC3Sub2Component implements OnInit, AfterViewInit, OnDestroy {

  private subscription: Subscription;

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
    // this.subscription = this.pixiServ.subject.subscribe(this);
  }

  next(data) {
    this.appWidth = data.width;
    this.appHeight = data.height;
    this.app = data.app;
    // this.tweenMax();  
    // this.init();
    // this.iniGraphics();
    // this.gsap2();
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}

  iniGraphics() {
    const graphics: Graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xff22aa, 1);
    // graphics.beginFill(0xff22aa, 0.5);
    graphics.drawCircle(0, 0,300);
    graphics.endFill();

    let texture: PIXI.Texture = graphics.generateCanvasTexture();
    let circle: PIXI.Sprite = new PIXI.Sprite(texture);

    circle.position.x = (this.appWidth - circle.width) / 2;
    circle.position.y = (this.appHeight - circle.height) / 2; 
  
    // circle.position.x = (this.appWidth - this.graphics.width) / 2;
    // circle.position.y = (this.appHeight - this.graphics.height) / 2; 

    // const texture: Texture = graphics.generateCanvasTexture();
    // const circle = new PIXI.Sprite(texture);
    
    this.pixiServ.container3.width = this.appWidth;
    this.pixiServ.container3.height = this.appHeight - 200;
    this.pixiServ.container3.addChild(circle);

}

  init() {
    this.satellite = this.loaderServ.initImage('./assets/img/sat.png');

    this.satellite.anchor.set(0.5);
    this.satellite.pivot.x = -300;
    
    this.satellite.position.x = (this.appWidth) / 2;
    this.satellite.position.y = (this.appHeight) / 2; 
    // this.satellite.x = 100;
    // this.satellite.width = 200;
    // this.satellite.height = 200;
    // this.satellite.position.x = (this.appWidth - this.satellite.width) / 2;
    // this.satellite.position.y = (this.appHeight - this.satellite.height) / 2; 
    
    console.log(this.satellite.width);
    // this.pixiServ.container3.skew.y = 2;
    // this.satellite.x = -150;
    // this.pixiServ.container3.addChild(graphics);
    // this.pixiServ.container3.addChild(this.satellite);
    // this.satellite.rotation += .02;

    this.app.ticker.add(() => {
      
      this.satellite.rotation += .02;
      
      this.pixiServ.container3.addChild(this.satellite);
    });

    // this.pixiServ.container3.addChild(this.satellite);
  }


  gsap2() {
    this.satellite = this.loaderServ.initImage('./assets/img/sat.png');

    this.satellite.position.x = (this.appWidth - this.satellite.width) / 2;
    this.satellite.position.y = (this.appHeight - this.satellite.height) / 2; 

    // this.pixiServ.container3.addChild(this.satellite);
    
    // center the sprite's anchor point
    this.satellite.anchor.x = 0.5;
    this.satellite.anchor.y = 0.5;

    this.satellite.x = this.appWidth/2;
    this.satellite.y = this.appHeight/2 - 115;
    // this.satellite.x = this.appWidth/2+250;
    // this.satellite.y = this.appHeight/2+250;

    this.satellite.scale.set(.4);
    
    let spx = this.appWidth/2;
    let spy = (this.appHeight/2);

    const rotateTl = new TimelineMax({repeat:-1});
      rotateTl
        .add('begin')
        .to(this.satellite, 10, {bezier:{curviness:1.5, values:[
          // {x:spx+250, y:spy}, 
          // {x:spx, y:spy+125},
          // {x:spx-250, y:spy},
          // {x:spx, y:spy-125},
          {x:spx+250, y:spy}, 
          {x:spx, y:spy+115},
          {x:spx-250, y:spy},
          {x:spx, y:spy-115},
          
        // ]}
        ]}, ease: Power0.easeNone
        // , repeat:-1, repeatDelay:0})
        })
        .add('end')
        // .to(this.satellite, 10, {pixi:{scale:0.4}}, {pixi:{scale:1.2, ease:ExpoScaleEase.config(0.4, 1.2)}}, 'begin');
        .to(this.satellite, 10, {pixi:{scale:1.2, ease:ExpoScaleEase.config(0.4, 1.2)}}, 'begin');
        // .fromTo(this.img, 3.7, {scale:0.6}, {scale:1.6, ease:ExpoScaleEase.config(0.6, 1.6)}, 'begin-first')

    this.pixiServ.container3.addChild(this.satellite);
  }

  tweenMax() {
    this.satellite = this.loaderServ.initImage('./assets/img/sat.png');

    this.satellite.position.x = (this.appWidth - this.satellite.width) / 2;
    this.satellite.position.y = (this.appHeight - this.satellite.height) / 2; 

    // this.pixiServ.container3.addChild(this.satellite);
    
    // center the sprite's anchor point
    this.satellite.anchor.x = 0.5;
    this.satellite.anchor.y = 0.5;

    this.satellite.x = this.appWidth/2;
    this.satellite.y = this.appHeight/2 - 125;

    this.satellite.scale.set(0.1);
    
    let spx = this.appWidth/2;
    let spy = this.appHeight/2;
    
    // var box = document.getElementsByClassName('box');
    
    function clearStage (that) {
      const clearTl = new TimelineMax();
      clearTl.to(that.sprite, 0, {pixi:{autoAlpha:0}});
      return clearTl;
    }

    function rotate(that) {
      // console.log(this)
      const rotateTl = new TimelineMax();
      rotateTl
        // .add('begin')
        .to(that.satellite, 16, {bezier:{curviness:.6, values:[
          {x:spx+450, y:spy}, 
          {x:spx, y:spy+125},
          {x:spx-450, y:spy},
          {x:spx, y:spy-125},
          
        ]}
        // ]}, ease:Power1.easeInOut
        // , repeat:-1, repeatDelay:0})
        , repeatDelay:0})
        .add('end');

        return rotateTl;
    }
    var self = this;
    function scale(that) {
      let scaleTl = new TimelineMax();

      scaleTl
        .to(self.satellite, 3, {pixi:{scaleX:1.3, scaleY:1.3}})
        .to(self.satellite, 1.5, {pixi:{scaleX:1.6, scaleY:1.6}})
        .to(self.satellite, 1.2, {pixi:{scaleX:1.3, scaleY:1.3}})
        .to(self.satellite, 1.5, {pixi:{scaleX:1, scaleY:1}});
      return scale;
    }
    

    let masterTl = new TimelineMax({
      repeat:-1,
      repeatDelay:-1
    });
    masterTl
      // .add(clearStage(this), 'clear')
      .to(this.satellite, 0, {pixi:{autoAlpha:1, scaleX:0, scaleY:0}})
      .add(rotate(this), 'rotate')
      .add(scale(this), 'scale')
      ;

      let scaler = 0.0015

      this.ticker.add(() => {

        if(this.satellite.x > spx && this.satellite.scale.x < 2.5){
          this.satellite.scale.x += scaler;
        this.satellite.scale.y += scaler;
        }else if(this.satellite.x < spx){
          this.satellite.scale.x -= scaler;
        this.satellite.scale.y -= scaler;
        }
  
        // if(this.satellite.x < spx - 250) {
        //   this.container.removeChild(this.satellite);
        //   this.container.removeChild(this.sprite2);
        //   this.container.addChild(this.satellite);
        //   this.container.addChild(this.sprite2);
        // } else if(this.satellite.x > spx + 250) {
        //   this.container.removeChild(this.satellite);
        //   this.container.removeChild(this.sprite2);
        //   this.container.addChild(this.sprite2);
        //   this.container.addChild(this.satellite);
        // }
      });
    this.pixiServ.container3.addChild(this.satellite);
    // this.app.stage.addChild(this.container);
  }

}