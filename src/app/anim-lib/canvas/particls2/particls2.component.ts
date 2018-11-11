import { Particle } from './particles.interface';
import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ParticlesService2 } from './particles2.service';

@Component({
  selector: 'anim-lib-particls2',
  templateUrl: './particls2.component.html',
  styleUrls: ['./particls2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Particls2Component implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas') canvasRef : ElementRef;

  private running: boolean = true;
  canvas: HTMLCanvasElement;
  draw: CanvasRenderingContext2D;
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
  colorers = ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'];

  constructor(private partService: ParticlesService2,
              private zone: NgZone,
              private changeDetect: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetect.detach();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.canvas = this.canvasRef.nativeElement;
      this.initCanvas();
      this.running = true;
      this.init();
      this.animate();
    });

  }
  
  ngOnDestroy() {
    this.running = false;
  }

  initCanvas() {
    this.canvWidth = this.canvas.offsetWidth;
    this.canvHeight = this.canvas.offsetHeight;
    this.canvas.width = this.canvWidth;
    this.canvas.height = this.canvHeight;
    // console.log(this.canvas.offsetWidth);
    // console.log(this.canvas.offsetHeight);
    this.draw = this.canvas.getContext('2d');
  }

  init() {
    if(!this.running) {
      return;
    }

    this.particles = [];
    for(let i = 0; i < 600; i++) {

      let r = this.partService.randIntFromRange(5, 20);
        let x = this.partService.randIntFromRange(100, this.canvWidth - 100 - r);
        let y = this.partService.randIntFromRange(100, this.canvHeight - 100 - r);
        let vx = this.partService.randIntFromRange(3, 10) * .5;
        let vy = this.partService.randIntFromRange(3, 10) * .6;
        
        let color = this.partService.randColor(this.colorers);
        // var cc = new Circle(x, y, Vx, Vy, r, color);
        this.particle = {x, y, vx, vy, r, color};
        this.particles.push(this.particle);
    }
    // console.log(Math.floor(Math.random() * Math.floor(7)));
    // console.log(colorArr.length);
  }

  private drawCircle(particle) {
    if(!this.running) {
      return;
    }
    

    this.draw.beginPath();
    this.draw.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
    this.draw.strokeStyle = particle.color;
    this.draw.stroke();
    this.draw.fillStyle = particle.color;
    this.draw.fill();
    // console.log(particle);
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
  }

  animate() {
    
    // Clear cavas
    
    this.draw.clearRect(0, 0, this.canvWidth, this.canvHeight);
    this.particles.forEach((particle) => {
    //   // console.log(particle);
      // this.particle = particle;
      this.updateCircle(particle);
    // console.log(this)
    });
    
    requestAnimationFrame(() => this.animate());
    
  }

  mousemove(e) {
    // console.log(e);
  if(this.mouse.status) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  }

  onResize() {
    if(this.running) {
      this.canvWidth = this.canvas.offsetWidth;
      this.canvHeight = this.canvas.offsetHeight;
      this.canvas.width = this.canvWidth;
      this.canvas.height = this.canvHeight;
      this.init();
    }
  }

  anim() {
    this.particles.forEach((particle) => {
      // console.log(particle);
      
      this.updateCircle(particle);
    });
  }

}

