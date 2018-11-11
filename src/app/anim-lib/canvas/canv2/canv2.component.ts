import { flock } from './flock';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'anim-lib-canv2',
  templateUrl: './canv2.component.html',
  styleUrls: ['./canv2.component.scss']
})
export class Canv2Component implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('canvas') canvasRef : ElementRef;
  @Input() folck: flock;

  private running: boolean = true;
  canvas: HTMLCanvasElement;
  draw: CanvasRenderingContext2D;
  canvWidth: number;
  canvHeight: number;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.initCanvas();
    this.draw = this.canvas.getContext('2d');

    this.running = true;
    this.paint();
  }
  
  ngOnDestroy() {
    this.running = false;
  }

  initCanvas() {
    this.canvWidth = this.canvas.offsetWidth;
    this.canvHeight = this.canvas.offsetHeight;
    this.canvas.width = this.canvWidth;
    this.canvas.height = this.canvHeight;
  }

  private paint() {
    if(!this.running) {
      return;
    }

    this.draw.fillStyle = 'rgba(221, 0, 49)';
    this.draw.fillRect(0, 0, 800, 500);

    // Advance flock. This updates the positions of all objects.
    // this.flock.tick()

    // Draw flock
    this.draw.beginPath();
    this.draw.fillStyle = 'rgb(255, 255, 255)';

  }

  onResize() {
    this.initCanvas();
  }

}
