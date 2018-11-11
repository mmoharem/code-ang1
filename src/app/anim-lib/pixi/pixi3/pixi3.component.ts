import { Particle } from './../../canvas/particls2/particles.interface';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { CanvasRenderer, WebGLRenderer, Container, loader, loaders, Texture, Application } from "pixi.js";
declare var PIXI: any;

@Component({
  selector: 'anim-lib-pixi3',
  templateUrl: './pixi3.component.html',
  styleUrls: ['./pixi3.component.scss']
})
export class Pixi3Component implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvasRef: ElementRef;

  private canvas: HTMLElement;
  private canvasW;
  private canvasH;

  private renderer: CanvasRenderer | WebGLRenderer;
  private app: Application;
  private container: Container;
  // private loader;
  loader = PIXI.loader;
  resources = PIXI.loader.resources;
  TextureCache = PIXI.utils.TextureCache;
  Rectangle = PIXI.Rectangle;
  Sprite = PIXI.Sprite;
  

  constructor(private rend2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasW = this.canvas.offsetWidth;
    this.canvasH = this.canvas.offsetHeight;
    
    // this.initPixi();
  }

  initPixi() {
    // this.renderer = new PIXI.autoDetectRenderer(this.canvasW, this.canvasH);
    this.app = new PIXI.Application(this.canvasW, this.canvasH);
    // this.rend2.appendChild(this.canvas, this.renderer.view);
    this.rend2.appendChild(this.canvas, this.app.view);
    // this.container = new PIXI.Container();
    this.container = new PIXI.Particle.ParticleContainer(200, {
      vertices:false,
      position:true,
      rotation:true
    });
    // this.renderer.render(this.container);
    this.app.stage.addChild(this.container);
    
    // this.loader = new PIXI.loaders.Loader();
    this.preload();
    

    // this.explosion();
  }

  randIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  cirArr = [];
  particles = [];

  preload() {
    this.loader.add('circle2', '../../../assets/img/circle2.json');
    this.loader.load(this.initTexture);
  }

  initTexture = () => {
    let resource = PIXI.loader.resources.circle2.textures
    
    for(let i = 0; i < 9; i++) {
      let cir = new PIXI.Sprite(resource[`circle${i+1}.png`]);
      this.cirArr.push(cir);
      // cir.x = 1 + (i*80);
      this.container.addChild(cir);    
    }
    // this.circle();
    // this.container.addChild(cir1);
  }

  // update() {
  //   this.ci
  // }

  
  
  
  
  
  onResize() {

  }

}
