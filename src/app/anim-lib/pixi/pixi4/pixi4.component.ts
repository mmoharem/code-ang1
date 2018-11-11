import { Particle } from './../../canvas/particls2/particles.interface';
import { Input, OnDestroy, OnChanges } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CanvasRenderer, WebGLRenderer, Container, Application } from "pixi.js";
declare var PIXI: any;


@Component({
  selector: 'anim-lib-pixi4',
  templateUrl: './pixi4.component.html',
  styleUrls: ['./pixi4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pixi4Component implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;
  @Input('isRun') isRun: boolean;

  private canvas: HTMLElement;
  private canvasW;
  private canvasH;

  private renderer: CanvasRenderer | WebGLRenderer;
  private app: Application;
  private container: Container;
  private particleContainer : Container = null;
  private ticker = new PIXI.ticker.Ticker();
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
    this.ticker.start();
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
      transparent: true,
      // resolution: 1,
      antialias: true,
      // legacy:true,
      // forceCanvas: true
    };
    // this.renderer = new PIXI.autoDetectRenderer(this.canvasW, this.canvasH, options);
    this.app = new PIXI.Application(this.canvasW, this.canvasH, options);
    // this.rend2.appendChild(this.canvas, this.renderer.view);
    this.rend2.appendChild(this.canvas, this.app.view);
    // this.container = new PIXI.Container();
    // this.loader = new PIXI.loaders.Loader();
    this.initPrtContainer();
    
  }

  initPrtContainer() {
    // if(this.particleContainer){
    //   return;
    // }
    const prtcOptions = {
      scale: true,
      // position: true,
      // rotation: true,
      // uvs: true,
      // tint: true,
      // alpha: true,
    };

    const partNo = 500;
    this.particleContainer = new PIXI.particles.ParticleContainer(partNo, prtcOptions);
    // this.app.stage.addChild(this.particleContainer);
    // this.renderer.render(this.particleContainer);
    this.particleContainer.interactive = true;
    this.totalParticls = this.renderer instanceof PIXI.WebGLRenderer ? partNo : 800;
    // this.totalParticls = this.app.renderer instanceof PIXI.WebGLRenderer ? partNo : 800;
    
    // this.initTexture(this.resource);
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
      this.initTexture(this.resource);
    });
    // this.initTexture(resource);
  }

  // initTexture = () => {
  initTexture(resource) {
    
    
    // var totalParticls = app.renderer instanceof PIXI.WebGLRenderer ? 10000 : 100;
    let r = 20;
    this.particles = [];
    for(let i = 0; i < this.totalParticls; i++) {
      let n = Math.floor((Math.random() * 9) + 1);
      // console.log(n);
      let cir = new PIXI.Sprite(resource['circle' + (n+1) + '.png']);
      cir.interactive = true;
      cir.x = this.randIntFromRange(100, this.canvasW - 100 - r);
      cir.y = this.randIntFromRange(100, this.canvasH - 100 - r);
      cir.vx = this.randIntFromRange(3, 10) * .2;
      cir.vy = this.randIntFromRange(3, 10) * .3;
     
      // cir.rotation = this.randIntFromRange(0, .9);
      cir.anchor.set(0.5);
      cir.scale.set(Math.random())
      this.particles.push(cir);
      
      this.particleContainer.addChild(cir);
      
    }
    this.ticker.add(this.animation, this);
  }

  animation(delta) {
    let xdx = 0.08;
    let xcx;
    let particle;
    // this.renderer.render(this.particleContainer);
    this.app.stage.addChild(this.particleContainer);
    for(let i = 0; i < this.totalParticls; i++) {
      particle = this.particles[i];

      if(particle.x + 20 > window.innerWidth || particle.x - 20 < 0) {
          particle.vx = -particle.vx;
        }   
      if(particle.y + 20 > window.innerHeight || particle.y - 20 < 0) {
        particle.vy = -particle.vy;
      }
      // particle.rotation += .01;
      particle.x += particle.vx;
      particle.y += particle.vy;
    
      if(this.mouse.x){
        // if(this.mouse.x - particle.x < this.area && this.mouse.x - particle.x > -this.area &&
        //   this.mouse.y - particle.y < this.area && this.mouse.y - particle.y > -this.area && particle.scale.x < 2 && this.status){
        if(this.mouse.x - particle.x < 80 && this.mouse.x - particle.x > -80 && this.mouse.y - particle.y > -80 && this.mouse.y - particle.y < 80 && this.status && particle.scale.x < 2.2){
          // particle.r += 2;
          // console.log(this.mouse.x)
          particle.scale.set(particle.scale.x+xdx);
        }
        else if(particle.scale.x > 1){
          xcx = particle.scale.x;
          xcx -= xdx;
          particle.scale.set(xcx);
        }
      }
    }
    // this.renderer.render(this.particleContainer);
    this.app.stage.addChild(this.particleContainer);
  }

  mousemove(e) {
    if(this.status) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }
  }

  onResize() {
    // this.canvasW = this.canvas.offsetWidth;
    // this.canvasH = this.canvas.offsetHeight;
    // this.app.renderer.autoResize = true;
    // this.app.renderer.resize(this.canvasW, this.canvasH);
    // this.initTexture(this.resource);
  }

  randIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  randColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  random(min, max) {
    return min + (max - min) * Math.random();
  }

}
