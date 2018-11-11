import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Particle } from './particles';

@Component({
  selector: 'anim-lib-canv1',
  templateUrl: './canv1.component.html',
  styleUrls: ['./canv1.component.scss']
})
export class Canv1Component implements OnInit, AfterViewInit, OnChanges {

  @Input() particles: Particle[];
  // @Input() particles;
  @ViewChild('canvas') canvasRef: ElementRef;

  canvas: HTMLCanvasElement;
  canvWidth: number;
  canvHeight: number;
  draw: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    // this.particles = 10;
  }

  ngAfterViewInit() {
    this.initCanvas();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('change');
    console.log(changes);

    // this.initCanvas();
  }

  initCanvas() {
    this.canvas = this.canvasRef.nativeElement;

    this.canvWidth = this.canvas.offsetWidth;
    this.canvHeight = this.canvas.offsetHeight;
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;

    this.draw = this.canvas.getContext('2d');

    this.drawLogo();
    // this.drawLogo2();
  }

  

  drawLogo() {
    this.draw.beginPath();
    this.draw.moveTo(250, 60);
    this.draw.lineTo(63.8, 126.4);
    this.draw.lineTo(92.2, 372.6);
    this.draw.lineTo(250, 460);
    this.draw.lineTo(407.8, 372.6);
    this.draw.lineTo(436.2, 126.4);
    this.draw.moveTo(250, 104.2);
    this.draw.lineTo(133.6, 365.2);
    this.draw.lineTo(177, 365.2);
    this.draw.lineTo(200.4, 306.8);
    this.draw.lineTo(299.2, 306.8);
    this.draw.lineTo(325.2, 365.2);
    this.draw.lineTo(362.6, 365.2);
    this.draw.lineTo(250, 104.2);
    this.draw.moveTo(304, 270.8);
    this.draw.lineTo(216, 270.8);
    this.draw.lineTo(250, 189);
    this.draw.lineTo(284, 270.8);
    this.draw.clip('evenodd');
    
    // Draw 50,000 circles at random points
    this.draw.beginPath();
    this.draw.fillStyle = '#DD0031';
    for (let i=0 ; i < 50000 ; i++) {
      let x = Math.random() * 500;
      let y = Math.random() * 500;
      this.draw.moveTo(x, y);
      this.draw.arc(x, y, 1, 0, Math.PI * 2);
    }
    this.draw.fill();
  }

  drawLogo2() {
    // clearing stage
    this.draw.clearRect(0, 0, 500, 500);

    // draw the logo (transperant without fill)
    this.draw.beginPath();
    this.draw.moveTo(250, 60);
    this.draw.lineTo(63.8, 126.4);
    this.draw.lineTo(92.2, 372.6);
    this.draw.lineTo(250, 460);
    this.draw.lineTo(407.8, 372.6);
    this.draw.lineTo(436.2, 126.4);
    this.draw.moveTo(250, 104.2);
    this.draw.lineTo(133.6, 365.2);
    this.draw.lineTo(177, 365.2);
    this.draw.lineTo(200.4, 306.8);
    this.draw.lineTo(299.2, 306.8);
    this.draw.lineTo(325.2, 365.2);
    this.draw.lineTo(362.6, 365.2);
    this.draw.lineTo(250, 104.2);
    this.draw.moveTo(304, 270.8);
    this.draw.lineTo(216, 270.8);
    this.draw.lineTo(250, 189);
    this.draw.lineTo(284, 270.8);
    this.draw.clip('evenodd');
    
    // Draw the points given as input
    this.draw.beginPath();
    this.draw.fillStyle = '#DD0031';
    
    for(let {x, y} of this.particles) {
      this.draw.moveTo(x, y);
      this.draw.rect(x, y, 1, 1);
    }
    // for(let particle of this.particles) {
    //   this.draw.moveTo(particle.x, particle.y);
    //   this.draw.rect(particle.x, particle.y, 1, 1);
    // }
    this.draw.fill();
  }

  drawRec() {
    this.draw.fillStyle = 'rgba(255, 0, 0, 0.1)'
    this.draw.fillRect(100, 100, 100, 100);
  }

  onResize() {
    // this.canvWidth = this.canvas.offsetWidth;
    // this.canvHeight = this.canvas.offsetHeight;
    // this.canvas.width = this.canvas.offsetWidth;
    // this.canvas.height = this.canvas.offsetHeight;
    // console.log('window.innerWidth: ' + window.innerWidth);
    // console.log('this.canvas.offsetWidth ' + this.canvas.offsetWidth);
    // console.log(this.canvas.width);
    // console.log('window.innerHeight: ' + window.innerHeight);
    // console.log('this.canvas.offsetHeight ' + this.canvas.offsetHeight);
    // console.log(this.canvas.height);
    // this.particles = true;
  }

}
