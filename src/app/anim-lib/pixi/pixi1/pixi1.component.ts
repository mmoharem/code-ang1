import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Application, Container, Text } from 'pixi.js';
import { TweenMax } from 'gsap';
declare var PIXI: any;


// declare var app: any;


@Component({
  selector: 'anim-lib-pixi1',
  templateUrl: './pixi1.component.html',
  styleUrls: ['./pixi1.component.scss']
})
export class Pixi1Component implements OnInit, AfterViewInit {

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


  constructor(private domRend: Renderer2) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initPixi();
    this.createText();
    // this.random();
    // this.ticker.start();
  }

  initPixi() {
    this.canvasW = this.canvas.nativeElement.offsetWidth;
    this.canvasH = this.canvas.nativeElement.offsetHeight;

    // if(height == 0) {
    //   setInterval(() => this.initPixiApp(), 100);
    //   return
    // }

    const options = {
      transparent: true,
      resolution: this.resolution,
      antialias: true,
      // view: this.canvas.nativeElement
    };

    


    this.app = new PIXI.Application(this.canvasW, this.canvasH, options);
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.domRend.appendChild(this.canvas.nativeElement, this.app.view);
    this.app.stage.interactive = true;

    this.container = new PIXI.Container();
   
    this.container.x = this.app.screen.width / 2;
    this.container.y = this.app.screen.height / 2;
    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;
    this.app.stage.addChild(this.container);

    // this.initCircle();
    // this.ticker.start();
    // this.ticker.add(this.onFrame, this);
    // const that = this;
    // this.onFrame(that);

    // this.onWavesTickerFrame();
    
  }

  createText() {
  
    let style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      // fontStyle: 'italic',
      fontWeight: 'bold',
      // fill: ['#ffffff', '#00ff99'], // gradient
      // fill: ['#000000'],
      // stroke: #000000',
      // strokeThickness: 5,
      // dropShadow: true,
      // dropShadowColor: '#000000',
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
      // wordWrap: true,
      wordWrapWidth: 440
    });

    this.stTextArr = Array.from('Welcom To Code Design');

    // const textObj =  new PIXI.Text(newtext, style);
  
    this.stTextArr.forEach((str, i) => {
      this.TextArr.push(new PIXI.Text(str, style));
      this.dxArr.push(this.dx += 25);
    });

    // this.updateText();
    // this.random();
    this.ticker.add(this.random, this);

    
    // text.anchor.set(0.5);
    
    // this.container.addChild(text);
  }

  updateText() {
    // console.log(this.stTextArr);
    // console.log(this.dxArr);

    

    
    
    
  }



  random() {
    let tt;
    for(let i = 0; i <= 20; i++) {
      // tt = new PIXI.Text(this.stTextArr[i]);
      tt = this.TextArr[i];
      tt.x = this.rand(0, 300);
      tt.y = this.rand(0, 300);
      // console.log(tt);
      
      this.container.addChild(tt);
    }
  }

  rand(min, max){
    return (Math.random() * (max - min)) + min;
  }

  initial() {
    let tt;
    for(let i = 0; i <= 20; i++) {
      tt = new PIXI.Text(this.stTextArr[i]);
      tt.x = this.dxArr[i];
      console.log(tt);
      
      this.container.addChild(tt);
    }
  }

  anime() {

    
  }

  
}
