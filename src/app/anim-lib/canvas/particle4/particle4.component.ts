import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Application, Container, Text, Graphics } from 'pixi.js';
// import { TweenMax } from 'gsap';
declare var PIXI: any;

@Component({
  selector: 'anim-lib-particle4',
  templateUrl: './particle4.component.html',
  styleUrls: ['./particle4.component.scss']
})
export class Particle4Component implements OnInit, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  app: Application;
  container: Container;
  ticker = new PIXI.ticker.Ticker();
  resolution: number = 1;
  canvasW;
  canvasH;
  stText: string;
  stTextArr = [];
  text: Text;
  TextArr = [];
  dx = 30;
  dxArr = [];
  dy;

  draw: Graphics;

  constructor(private domRend: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.initPixi();
  }

  initPixi() {
    // this.canvasW = this.canvas.nativeElement.offsetWidth;
    // this.canvasH = this.canvas.nativeElement.offsetHeight;
    this.canvasW = this.canvas.nativeElement.offsetWidth;
    this.canvasH = this.canvas.nativeElement.offsetHeight;

    // if(height == 0) {
    //   setInterval(() => this.initPixiApp(), 100);
    //   return
    // }

    const options = {
      transparent: false,
      resolution: this.resolution,
      antialias: false
    }

    


    this.app = new PIXI.Application(this.canvasW, this.canvasH, options);
    this.app.renderer.view.style.display = 'block';
    // this.app.renderer.autoResize = true;
    // this.app.renderer.resize(512, 512);
    this.domRend.appendChild(this.canvas.nativeElement, this.app.view);
    // this.app.stage.interactive = true;

    this.container = new PIXI.Container();
    // this.container.x = -50;
    // this.container.y = -200;
   
    // this.container.x = this.app.screen.width / 2;
    // this.container.y = this.app.screen.height / 2;
    // this.container.pivot.x = this.container.width / 2;
    // this.container.pivot.y = this.container.height / 2;
    // this.container.width = 600;
    console.log(this.container.width); 
    console.log(this.container.hitArea); 
    

    this.app.stage.addChild(this.container);

    this.draw = new PIXI.Graphics();
    this.draw.beginFill(0xFF3300);
    this.draw.drawRect(0, 0, 120, 120);
    this.draw.endFill();
  
    // this.draw.x = this.app.screen.width / 2;
    // this.draw.y = this.app.screen.height / 2;
    // this.container.addChild(this.draw);

    this.container.addChild(this.draw);

    console.log(this.app.screen.width);
    console.log(this.canvas.nativeElement.offsetWidth);
    console.log(this.app.screen.height);
    console.log(this.canvas.nativeElement.offsetHeight);
    

    // this.container.x = (this.app.screen.width - this.container.width) / 2;
    // this.container.y = (this.app.screen.height - this.container.height) / 2;
    // this.container.x = this.app.screen.width / 2;
    // this.container.y = this.app.screen.height / 2;
    // this.container.y = (this.app.screen.height - this.container.height) / 2;
    
  }

}
