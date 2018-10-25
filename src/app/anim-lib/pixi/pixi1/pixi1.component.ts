import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Application, Container, Text } from 'pixi.js';
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
      fill: ['#000000'],
      // stroke: '#4a1850',
      // strokeThickness: 5,
      // dropShadow: true,
      // dropShadowColor: '#000000',
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
      // wordWrap: true,
      wordWrapWidth: 440
    });

    this.stTextArr = Array.from('Welcon To Code Design');

    // const textObj =  new PIXI.Text(newtext, style);
  
    this.stTextArr.forEach((str, i) => {
      this.stTextArr.push(new PIXI.Text(str, style));
      this.dxArr.push(this.dx += 30);
    });

    this.updateText();
    // const newtext = newArr.join('');

    
    // text.anchor.set(0.5);
    
    // this.container.addChild(text);
  }

  updateText() {
    console.log(this.stTextArr);
    console.log(this.dxArr);
    
    
  }

}
