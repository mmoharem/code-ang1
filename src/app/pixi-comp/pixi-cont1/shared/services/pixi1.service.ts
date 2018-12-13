import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanvasRenderer, WebGLRenderer, Container, Application, Graphics, Texture, Sprite } from "pixi.js";
declare var PIXI: any;

@Injectable({
  providedIn: 'root'
})
export class Pixi1Service {

  subject = new Subject();

  app: Application;
  mainContainer: Container = new PIXI.Container();
  container1: Container = new PIXI.Container();
  container2: Container = new PIXI.Container();
  container3: Container = new PIXI.Container();

  appWidth: number;
  appHeight: number;

  renderer;

  constructor() { }

  emmitSubject() {
    this.subject.next({
      width: this.appWidth,
      height: this.appHeight,
      app: this.app
    });
  }

  initPixi(canvas: HTMLElement) {
    
    const options = {
      width: canvas.offsetWidth, 
      height: canvas.offsetHeight, 
      transparent: true,
      // resolution: 1,
      antialias: true,
      // legacy:true,
      // forceCanvas: true,
      view: canvas
    };
    this.appWidth = canvas.offsetWidth;
    this.appHeight = canvas.offsetHeight;
    // console.log(this.appWidth);
  
    this.app = new PIXI.Application(options);
    this.renderer = this.app.renderer;
    this.emmitSubject();
    
    // this.mainContainer = new PIXI.Container();
    // this.container.x =800;
    this.app.stage.addChild(this.mainContainer);
    this.mainContainer.addChild(this.container1);
    this.mainContainer.addChild(this.container2);
    // this.container2.scale.set(.7)
    this.container2.addChild(this.container3);
  }

  initContainer() {
    // this.container = new PIXI.Container();
  }
  
}

class theContainer {

}
