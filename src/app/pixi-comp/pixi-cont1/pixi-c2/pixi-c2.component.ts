import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit, OnDestroy, OnChanges, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CanvasRenderer, WebGLRenderer, Container, Application, Graphics, Texture, Sprite } from "pixi.js";
declare var PIXI: any;
import { TweenMax, TimelineMax } from 'gsap';
// declare var TimelineMax;
// declare var TweenMax;

@Component({
  selector: 'app-pixi-c2',
  templateUrl: './pixi-c2.component.html',
  styleUrls: ['./pixi-c2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PixiC2Component implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;
  @Input('isRun') isRun: boolean;

  private canvas: HTMLElement;
  private canvasW;
  private canvasH;

  private renderer: CanvasRenderer | WebGLRenderer;
  private app: Application;
  private container: Container;
  private particleContainer : Container = null;
  private draw: Graphics;
  private draw2: Graphics;
  private ticker = new PIXI.ticker.Ticker();

  texture: Texture;
  sprite: Sprite;
  texture2: Texture;
  sprite2: Sprite;
  // private loader;
  resource;
  loader = PIXI.loader;
  resources = PIXI.loader.resources;
  TextureCache = PIXI.utils.TextureCache;
  Rectangle = PIXI.Rectangle;
  Sprite = PIXI.Sprite;

  mouse = {
    
    x: undefined,
    y: undefined,
    
  }
  status: false
  area: 100;
  grow: number = 70;

  particles = [];
  totalParticls;
  

  constructor(private rend2: Renderer2,
              private changeRef: ChangeDetectorRef,
              private zone: NgZone) { }

  ngOnInit() {
    this.changeRef.detach();
  }

  ngOnChanges() {
    // this.ticker.start();
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasW = this.canvas.offsetWidth;
    this.canvasH = this.canvas.offsetHeight;
    this.zone.runOutsideAngular(() => {
      // this.initPixi();
      // this.preload();
    });
  }

  ngOnDestroy() {
    this.ticker.stop();
  }

  initPixi() {
    const options = {
      // transparent: true,
      // resolution: 1,
      antialias: true,
      // legacy:true,
      // forceCanvas: true
    };
    // this.renderer = new PIXI.autoDetectRenderer(this.canvasW, this.canvasH, options);
    this.app = new PIXI.Application(this.canvasW, this.canvasH, options);
    this.app.renderer.view.style.display = 'block';
    // this.rend2.appendChild(this.canvas, this.renderer.view);
    this.rend2.appendChild(this.canvas, this.app.view);
    this.container = new PIXI.Container();
    // this.app.stage.addChild(this.container);
    this.draw2 = new PIXI.Graphics();
    this.draw = new PIXI.Graphics();
    this.drawCircle2();
    // this.animation();
    // this.loader = new PIXI.loaders.Loader();
    
    
  }

  drawCircle2() {
    this.draw2.lineStyle(0);
    this.draw2.beginFill(0x3498DB, 1);
    this.draw2.drawCircle(0, 0, 200);
    this.draw2.endFill();

    this.texture2 = this.draw2.generateCanvasTexture();

    this.sprite2 = new PIXI.Sprite(this.texture2);
    // this.sprite2.anchor.set(0.5);
    this.sprite2.x = 0;
    this.sprite2.y = 0;

    // this.sprite2.position.x = (this.canvasW) / 2;
    // this.sprite2.position.y = (this.canvasH) / 2; 
    this.sprite2.position.x = (this.canvasW - this.sprite2.width) / 2;
    this.sprite2.position.y = (this.canvasH - this.sprite2.height) / 2; 

    // this.container.addChild(this.sprite2);
    // this.app.stage.addChild(this.container);
    // this.drawCircle();
    this.tweenMax();
  }

  tweenMax() {
    // this.draw.lineStyle(0);
    // this.draw.beginFill(0xE74C3C, 1);
    // this.draw.drawCircle(0, 0, 20);
    // this.draw.endFill();
  
    // this.texture = this.draw.generateCanvasTexture();
    var img = new Image();
    img.src = './assets/img/sat.png'
    var base = new PIXI.BaseTexture(img);

    this.texture = new PIXI.Texture(base);

    this.sprite = new PIXI.Sprite(this.texture);
    // center the sprite's anchor point
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    // this.sprite.x = 1400;rot
    // this.sprite.y = 40;
    // this.sprite.scale.set(.4);
    // this.sprite.pivot.x = (this.sprite2.width/2);
    // this.sprite.pivot.y = (this.sprite2.height/2);
    this.sprite.x = this.canvasW/2;
    this.sprite.y = this.canvasH/2 - 125;

    this.sprite.scale.set(0.1);
    
    let spx = this.canvasW/2;
    let spy = this.canvasH/2;
    
    // console.log(this);
    // this.container.addChild(this.sprite2);
    

    // let masterTl = new TimelineMax();
    // masterTl.to(this.sprite, 1, {pixi:{x:spx-150, y:spy-70}});
    var box = document.getElementsByClassName('box');
    
    
    // var that = this;
    
    function clearStage (that) {
      const clearTl = new TimelineMax();
      clearTl.to(that.sprite, 0, {pixi:{autoAlpha:0}});
      return clearTl;
    }

    function rotate(that) {
      const rotateTl = new TimelineMax();
      rotateTl
        .add('begin')
        .to(that.sprite, 16, {bezier:{curviness:1.5, values:[
          // {x:spx-300, y:spy},
          // {x:spx, y:spy-125}, 
          {x:spx+350, y:spy}, 
          {x:spx, y:spy+125},
          {x:spx-350, y:spy},
          {x:spx, y:spy-125},
          
        // ]}, ease:Power1.easeInOut
        ]}
        // , repeat:-1, repeatDelay:0})
        , repeatDelay:0})
        .add('end');

        return rotateTl;
    }
    var self = this;
    function scale(that) {
      let scaleTl = new TimelineMax();

      scaleTl
        .to(self.sprite, 3, {pixi:{scaleX:1.3, scaleY:1.3}})
        .to(self.sprite, 1.5, {pixi:{scaleX:1.6, scaleY:1.6}})
        .to(self.sprite, 1.2, {pixi:{scaleX:1.3, scaleY:1.3}})
        .to(self.sprite, 1.5, {pixi:{scaleX:1, scaleY:1}});
      return scale;
    }


    let masterTl = new TimelineMax({
      repeat:-1,
      repeatDelay:-1
    });
    masterTl
      .add(clearStage(this), 'clear')
      .to(this.sprite, 0, {pixi:{autoAlpha:1, scaleX:0, scaleY:0}})
      .add(rotate(this), 'rotate')
      // .add(scale(this), 'scale')
      ;

      let scaler = 0.0015

      this.ticker.add(() => {

        if(this.sprite.x > spx && this.sprite.scale.x < 2.5){
          this.sprite.scale.x += scaler;
        this.sprite.scale.y += scaler;
        }else if(this.sprite.x < spx){
          this.sprite.scale.x -= scaler;
        this.sprite.scale.y -= scaler;
        }
    

        if(this.sprite.x < spx - 250) {
          this.container.removeChild(this.sprite);
          // this.container.removeChild(this.sprite2);
          this.container.addChild(this.sprite);
          // this.container.addChild(this.sprite2);
          
        } else if(this.sprite.x > spx + 250) {
          this.container.removeChild(this.sprite);
          // this.container.removeChild(this.sprite2);
          // this.container.addChild(this.sprite2);
          this.container.addChild(this.sprite);
        }
        // console.log(this.sprite.x);
      });

    // TweenMax.to(this.sprite, 1, {pixi:{x:spx+80}});
    // let masterTl = new TimelineMax();
    // masterTl.to(this.sprite, 1, {pixi:{x:spx-150, y:spy-70}})
    // masterTl
    // .add('begin')
    // .to(this.sprite, 8, {bezier:{curviness:1.25, values:[
    //   // {x:spx-300, y:spy},
    //   // {x:spx, y:spy-125}, 
    //   {x:spx+300, y:spy}, 
    //   {x:spx, y:spy+125},
    //   {x:spx-300, y:spy},
    //   {x:spx, y:spy-125},
      
    // ], autoRotate:true}, onComplete:second, ease:Power1.easeInOut
    // // , repeat:-1, repeatDelay:0})
    // , repeatDelay:0})
    // .add('end')
    // .add(second());

    // .to(this.sprite.scale, 2, {x:1.3, y:1.3}, '-=7')
    // .to(this.sprite.scale, 2, {x:1.6, y:1.6})
    // .to(this.sprite.scale, 2, {x:1.3, y:1.3}, '-=1');

    // .to(this.sprite, 2.5, {pixi:{scaleX:1.3, scaleY:1.3, colorize:'green'}}, 'begin')
    // .to(this.sprite, 1.5, {pixi:{scaleX:1.6, scaleY:1.6, colorize:'blue'}})
    // .to(this.sprite, 2, {pixi:{scaleX:1.3, scaleY:1.3, colorize:'red'}})
    // .to(this.sprite, 2, {pixi:{scaleX:1, scaleY:1, colorize:'green'}})

    this.app.stage.addChild(this.container);
  }
  drawCircle() {
    this.draw.lineStyle(0);
    this.draw.beginFill(0xE74C3C, 1);
    this.draw.drawCircle(0, 0, 20);
    this.draw.endFill();
  
    this.texture = this.draw.generateCanvasTexture();

    this.sprite = new PIXI.Sprite(this.texture);
    // center the sprite's anchor point
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.x = this.canvasW/2;
    this.sprite.y = this.canvasH/2 - 140;



    // this.container.addChild(this.sprite2);
    this.container.addChild(this.sprite);
    
    // this.animation();
    // this.ticker.add(() => {
      // this.sprite.rotation += .02;
      
      // this.container.addChild(this.sprite);
    // })
    
    this.app.stage.addChild(this.container);
  }

  
  animation() {
    requestAnimationFrame(this.animation);
    // this.sprite.rotation += 0.008;
    this.container.addChild(this.sprite);
    // this.app.stage.addChild(this.container);
  }

  

  preload() {
    // if(!this.isRun){
    //   return;
    // }
    // if(this.resource){
    //   this.initTexture(this.resource);
    // }
    this.loader.add('circle2', '../../../assets/img/circle2.json');
    // this.loader.load(this.initTexture);
    this.loader.load(() => {
      this.resource = PIXI.loader.resources.circle2.textures;
      // this.initTexture(this.resource);
    });
    // this.initTexture(resource);
  }

  onResize() {

  }

}
