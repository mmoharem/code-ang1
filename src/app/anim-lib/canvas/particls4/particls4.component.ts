import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy, OnChanges, SimpleChanges, Input, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { Container, Graphics, Application, Texture, Sprite } from 'pixi.js';
import { ParticlesService2 } from "../particls2/particles2.service";
declare var PIXI: any;

@Component({
  selector: 'anim-lib-particls4',
  templateUrl: './particls4.component.html',
  styleUrls: ['./particls4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Particls4Component implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('canvas') canvas: ElementRef;
  @Input() paused = false;
  @Input() autoWaves = false;

  public app: Application;
  // public stage: any;
  // public circle: Graphics;
  // public circleMask: any;
  public container: Container;
  // public circle = PIXI.Graphics;
  // public circleMask = PIXI.Graphics;

  FPS = 60;
  resolution = 1;
  ticker = new PIXI.ticker.Ticker();
  draw: Graphics;
  // renderer: any = PIXI.CanvasRenderer | PIXI.WebGLRenderer;
  // container = PIXI.Container;
  springs = [];
  storeY;
  extend = 0;
  fK = .95;

  part: Sprite;

  particles: {
    x: number,
    y: number,
    vx: number,
    vy: number,
    r: number,
    color: string
    // xpos: number,
    // ypos: number,
    // origY: number,
    // ay: number,
    // vy: number,
    // mass: number,
  }[] = [];
  mouseX = 0;
  mouseY = 0;
  circleRadius: number;
  // circle: PIXI.Graphics;
  // circleMask: PIXI.Graphics;
  initialDraw = true;
  calculating = true;
  wavesTickerCounter = 0;

  constructor(private domRender: Renderer2,
    private zone: NgZone,
    private changeDetector: ChangeDetectorRef,
    private partService: ParticlesService2) { }

  ngOnInit() {
    this.changeDetector.detach();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initPixiApp();
    });
  }

  //  ngOnChanges() {
    // console.log('ticker.start()');
  //  }

  ngOnChanges(changes: SimpleChanges): void {
  // console.log('ticker.start()');
    if (changes['paused']) {
      if (this.paused) {
        this.ticker.stop();
        console.log('ticker.start()');
      } else {
        this.ticker.start();
        console.log('ticker.start()');
      }
    }
  }

  ngOnDestroy(): void {
    PIXI.ticker.stop();
  }

  initPixiApp() {
    const width = this.canvas.nativeElement.offsetWidth;
    const height = this.canvas.nativeElement.offsetHeight;

    // if(height == 0) {
    //   setInterval(() => this.initPixiApp(), 100);
    //   return
    // }

    const options = {
      transparent: true,
      resolution: this.resolution,
      antialias: true,
      // legacy:true,
      forceCanvas: true
    };

    


    this.app = new PIXI.Application(width, height, options);
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.domRender.appendChild(this.canvas.nativeElement, this.app.view);
    this.app.stage.interactive = true;

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
    this.draw = new PIXI.Graphics();

    this.initCircle();
    // this.circ();
    // this.ticker.start();
    this.ticker.add(this.anime, this);


    // this.onWavesTickerFrame();
    
  }

  circ() {
    this.draw.lineStyle(2, 0xFF00FF, 1);
    this.draw.beginFill(0xFF00BB, 0.25);
    this.draw.drawCircle(470, 90,60);
    this.draw.endFill();
    let texture: Texture = this.draw.generateCanvasTexture();
    this.part = new PIXI.Sprite(texture);
    // this.container.x = 400;
    // console.log(this.container.width);
    // console.log(this.container.height);
    // this.container.x = (this.canvas.nativeElement.offsetWidth - this.container.width) / 2;
    // this.container.y = (this.canvas.nativeElement.offsetHeight - this.container.height) / 2;
    this.container.addChild(this.draw);
    this.container.addChild(this.part);
    this.draw.clear();
    // this.part.destroy();
  }

  onFrame(_) {
    
    // this.updateCircle();

    // if (this.wavesTickerCounter == Math.ceil(500 / (1000 / this.FPS))) {
    //   this.wavesTickerCounter = 0;
    //   this.onWavesTickerFrame();
    // } else {
    //   this.wavesTickerCounter++;
    // }

    // this.particles.forEach(() => {
    //   this.update();
    // });

    // this.app.stage.addChild(this.container);
    // // this.app.renderer.render(this.stage);

    // if (this.paused) {
    //   this.ticker.stop();
    // }
  }

  initCircle() {
    // if (this.initCircle) {
    //   this.container.removeChild(this.draw);
    // }
    
    this.particles = [];
    let colors = ['0x2C3E50', '0xE74C3C', '0xECF0F1', '0x3498DB', '0x2980B9'];
    for(let i = 0; i < 2; i++) {

        let r = this.partService.randIntFromRange(5, 20);
        let x = this.partService.randIntFromRange(100, this.canvas.nativeElement.offsetWidth - 100 - r);
        let y = this.partService.randIntFromRange(100, this.canvas.nativeElement.offsetHeight - 100 - r);
        let vx = this.partService.randIntFromRange(3, 10) * .5;
        let vy = this.partService.randIntFromRange(3, 10) * .6;
        
        let color = this.partService.randColor(colors);
        // var cc = new Circle(x, y, Vx, Vy, r, color);
        // this.particle = {x, y, vx, vy, r, color};
        this.particles.push({x, y, vx, vy, r, color});
    }
  }

  update(particle) {
    

    // this.draw = new PIXI.Graphics();
    


    if(particle.x + particle.r > this.canvas.nativeElement.offsetWidth || particle.x - particle.r < 0) {
      particle.vx = -particle.vx;
    }

    if(particle.y + particle.r > this.canvas.nativeElement.offsetHeight || particle.y - particle.r < 0) {
      particle.vy = -particle.vy;
    }

    particle.x += particle.vx;
    particle.y += particle.vy;
    

    // if(this.mouse.x){
    //   if(this.mouse.x - particle.x < this.mouse.area && this.mouse.x - particle.x > -this.mouse.area &&
    //     this.mouse.y - particle.y < this.mouse.area && this.mouse.y - particle.y > -this.mouse.area && particle.r < this.grow && this.mouse.status){
    //     particle.r += 2;
    //   }
    //   else if(particle.r > 20){
    //     particle.r -= 2;
    //   }
    // }
    this.draw.lineStyle(0);
    this.draw.beginFill(particle.color, 1);
    this.draw.drawCircle(particle.x, particle.y, particle.r);
    this.draw.endFill();
    let texture: Texture = this.draw.generateCanvasTexture();
    this.part = new PIXI.Sprite(texture);
    this.part.destroy();
  }

  anime() {

    // this.draw.clear();
    
    // if(!this.part) {
    //   return;
    // }
    // this.part.destroy();
    this.particles.forEach(particle => {
      this.update(particle);
    });
    // this.container.addChild(this.draw);
    this.container.addChild(this.part);
    // this.app.stage.addChild(this.draw);
  }

}
