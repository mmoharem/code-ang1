import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, ChangeDetectionStrategy, NgZone, ChangeDetectorRef } from '@angular/core';
import { Application, Container, Text, Graphics } from 'pixi.js';
import { Particle } from '../particls2/particles.interface';
import { ParticlesService2 } from '../particls2/particles2.service';
// import { TweenMax } from 'gsap';
declare var PIXI: any;

@Component({
  selector: 'anim-lib-particls3',
  templateUrl: './particls3.component.html',
  styleUrls: ['./particls3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Particls3Component implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('canvas') canvasRef: ElementRef;
  @Input('run') run:boolean = false;
  canvas: HTMLCanvasElement;

  app: Application;
  container: Container;
  ticker = new PIXI.ticker.Ticker();
  resolution: number = 1;
  draw: Graphics;

  canvWidth: number;
  canvHeight: number;
 
  mouse = {
    status: false,
    x: undefined,
    y: undefined,
    area: 100,
  }

  grow: number = 70;

  particles: Particle[] = [];
  particle: Particle;
  colors = ['0x2C3E50', '0xE74C3C', '0xECF0F1', '0x3498DB', '0x2980B9'];

  constructor(private domRend: Renderer2,
              private partService: ParticlesService2,
              private zone: NgZone,
              private changeDetect: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetect.detach();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      console.log('ngAfterViewInit');
    // this.initPixi();
    console.log('start');
    });
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    // this.ticker.start();

  }

  initPixi() {
    this.canvas = this.canvasRef.nativeElement;
    // this.canvasW = this.canvas.nativeElement.offsetWidth;
    // this.canvasH = this.canvas.nativeElement.offsetHeight;
    this.canvWidth = this.canvas.offsetWidth;
    this.canvHeight = this.canvas.offsetHeight;

    // if(height == 0) {
    //   setInterval(() => this.initPixiApp(), 100);
    //   return
    // }

    const options = {
      transparent: true,
      resolution: this.resolution,
      antialias: false
    }

    this.app = new PIXI.Application(this.canvWidth, this.canvHeight, options);
    this.app.renderer.view.style.display = 'block';
    // this.app.renderer.autoResize = true;
    this.domRend.appendChild(this.canvas, this.app.view);
    // this.app.stage.interactive = true;

    this.container = new PIXI.Container(); 
    this.app.stage.addChild(this.container);

    // this.draw = new PIXI.Graphics();
    // this.draw.beginFill(0xFF3300);
    // this.draw.drawRect(0, 0, 120, 120);
    // this.draw.endFill();
    this.draw = new PIXI.Graphics();
    this.init();
    this.ticker.add(this.anim, this);
    console.log('initPixi');
  }

  anim() {
    this.draw.clear();
    this.particles.forEach((particle) => {
      // console.log(particle);
      this.updateCircle(particle);
    });
    this.container.addChild(this.draw);
    // console.log('anim');
  }

  init() {
    // if(!this.running) {
    //   return;
    // }

    this.particles = [];
    for(let i = 0; i < 500; i++) {

      let r = this.partService.randIntFromRange(5, 20);
        let x = this.partService.randIntFromRange(100, this.canvWidth - 100 - r);
        let y = this.partService.randIntFromRange(100, this.canvHeight - 100 - r);
        let vx = this.partService.randIntFromRange(3, 10) * .5;
        let vy = this.partService.randIntFromRange(3, 10) * .6;
        
        let color = this.partService.randColor(this.colors);
        // var cc = new Circle(x, y, Vx, Vy, r, color);
        this.particle = {x, y, vx, vy, r, color};
        this.particles.push(this.particle);
    }
    // console.log(Math.floor(Math.random() * Math.floor(7)));
    // console.log(colorArr.length);
    // this.ticker.add(this.anim, this);
    console.log('init');
  }

  drawCircle(particle) {
    // if(!this.running) {
    //   return;
    // }
   
    // this.draw.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);

    // this.draw = new PIXI.Graphics();
    
    
    this.draw.lineStyle(0);
    this.draw.beginFill(particle.color, 1);
    this.draw.drawCircle(particle.x, particle.y, particle.r);
    this.draw.endFill();
    // this.container.addChild(this.draw);
    // console.log('drawCircle');
  }

  updateCircle(particle) {
    if(particle.x + particle.r > this.canvWidth || particle.x - particle.r < 0) {
      particle.vx = -particle.vx;
    }

    if(particle.y + particle.r > this.canvHeight || particle.y - particle.r < 0) {
      particle.vy = -particle.vy;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;

    if(this.mouse.x){
      if(this.mouse.x - particle.x < this.mouse.area && this.mouse.x - particle.x > -this.mouse.area &&
        this.mouse.y - particle.y < this.mouse.area && this.mouse.y - particle.y > -this.mouse.area && particle.r < this.grow && this.mouse.status){
        particle.r += 2;
      }
      else if(particle.r > 20){
        particle.r -= 2;
      }
    }

    this.drawCircle(particle);
    // console.log('updateCircle');
  }

  

}
