import { Injectable, Renderer2 } from '@angular/core';
import { CanvasRenderer, WebGLRenderer, Container, Application, Graphics, Texture, Sprite } from "pixi.js";
import { TimelineMax } from 'gsap';
declare var PIXI: any;

@Injectable({
  providedIn: 'root'
})
export class PixiSatService {

  // private canvas: HTMLElement;
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

  // constructor(private rend2: Renderer2) { }

  initPixi(canvas) {
    const options = {
      // transparent: true,
      // resolution: 1,
      antialias: true,
      // legacy:true,
      // forceCanvas: true
    };
    
    this.app = new PIXI.Application(this.canvasW, this.canvasH, options);
    this.app.renderer.view.style.display = 'block';
    // this.rend2.appendChild(canvas, this.app.view);
    this.container = new PIXI.Container();
    this.draw2 = new PIXI.Graphics();
    this.draw = new PIXI.Graphics();
    // this.drawCircle2();
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

    this.sprite2.x = 0;
    this.sprite2.y = 0;

    this.sprite2.position.x = (this.canvasW - this.sprite2.width) / 2;
    this.sprite2.position.y = (this.canvasH - this.sprite2.height) / 2; 

    // this.tweenMax();
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

    this.sprite.x = this.canvasW/2;
    this.sprite.y = this.canvasH/2 - 125;

    this.sprite.scale.set(0.1);
    
    let spx = this.canvasW/2;
    let spy = this.canvasH/2;
    
    var box = document.getElementsByClassName('box');
    
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
          {x:spx+350, y:spy}, 
          {x:spx, y:spy+125},
          {x:spx-350, y:spy},
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
          this.container.removeChild(this.sprite2);
          this.container.addChild(this.sprite);
          this.container.addChild(this.sprite2);
        } else if(this.sprite.x > spx + 250) {
          this.container.removeChild(this.sprite);
          this.container.removeChild(this.sprite2);
          this.container.addChild(this.sprite2);
          this.container.addChild(this.sprite);
        }
      });

    this.app.stage.addChild(this.container);
  }
}
