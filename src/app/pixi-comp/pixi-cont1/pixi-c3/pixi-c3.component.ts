import { Subscription } from 'rxjs';
import { 
  Component, OnInit, 
  ChangeDetectionStrategy, 
  ViewChild, ElementRef, Input, 
  AfterViewInit, Renderer2, OnChanges, OnDestroy } from '@angular/core';
import { PixiSatService } from '../shared/services/pixi-sat.service';
import { Application, Container, Sprite } from 'pixi.js';
import { Pixi1Service } from '../shared/services/pixi1.service';
import { LoaderService } from '../shared/services/loader.service';
declare var PIXI: any;

@Component({
  selector: 'app-pixi-c3',
  templateUrl: './pixi-c3.component.html',
  styleUrls: ['./pixi-c3.component.scss'],
  providers: [
    LoaderService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PixiC3Component implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;
  // @Input('isRun') isRun: boolean;
  // @Input('done') done: boolean = false;

  visible = true;
  // autoWaves = false;
  isRun = false;
  private subscription: Subscription;

  canvas: HTMLElement;
  // app: Application;

  container: Container;

  frames = [];

  constructor(private pixi1Serv: Pixi1Service,
              private pixiSatServ: PixiSatService,
              private rend2: Renderer2,
              private loadServ: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loadServ.framesEmit.subscribe(this);
  }

  next(frames: Sprite[]) {
    this.frames = frames;
    // console.log(this.frames);
    // this.showSprite();
  }

  ngAfterViewInit() {

    this.canvas = this.canvasRef.nativeElement;

    this.pixi1Serv.initPixi(this.canvas);

    this.loadServ.initLoader('spriteSheet', '../../../assets/img/circle2.json', 'circle', 8);
  }

  showSprite() {
    this.frames.forEach((frame: Sprite) => {
      
    });
    // let frame;
    let dx = 200;
    for(let i = 0; i < this.frames.length; i++){
      let frame = this.frames[i];
      frame.x = i*100;
      console.log(frame)
      // this.container.addChild(frame);
      this.pixi1Serv.container1.addChild(frame);
    }
  }

  ngOnChanges() {
    // this.beco();
  }

  onResize() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
