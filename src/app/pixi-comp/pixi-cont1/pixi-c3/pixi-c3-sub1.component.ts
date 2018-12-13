import { Graphics, Sprite } from 'pixi.js';
import { Pixi1Service } from './../shared/services/pixi1.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoaderService, ploader2 } from '../shared/services/loader.service';

@Component({
  selector: 'pixi-c3-sub1',
//   templateUrl: './pixi-c3.component.html',
template: ``,
  styleUrls: ['./pixi-c3.component.scss'],
  providers: [
    LoaderService
  ]
})
export class PixiC3Sub1Component implements OnInit, AfterViewInit {

    draw2: Graphics = new PIXI.Graphics();
    appWidth: number;
    appHeight: number;

  constructor(private pixiServ: Pixi1Service,
              private loaderServ: LoaderService) { }

  ngOnInit() {
      
  }

  ngAfterViewInit() {
    this.pixiServ.subject.subscribe(this);
  }

  next(data) {
    this.appWidth = data.wdth;
    this.appHeight = data.height;
    this.initGraphics();  
  }

  initGraphics() {
    this.draw2.lineStyle(0);
    this.draw2.beginFill(0x3498DB, 1);
    this.draw2.drawCircle(0, 0, 200);
    this.draw2.endFill();

    let texture: PIXI.Texture = this.draw2.generateCanvasTexture();
    // let texture: PIXI.Texture = this.pixiServ.app.renderer.generateTexture(this.draw2);
    let sprite: PIXI.Sprite = new PIXI.Sprite(texture); 

    sprite.x = (this.pixiServ.appWidth - sprite.width) / 2;
    sprite.y = (this.pixiServ.appHeight - sprite.height) / 2;

    console.log(this.pixiServ.appWidth)
    this.pixiServ.mainContainer.addChild(sprite)
  }

}
