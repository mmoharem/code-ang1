import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, OnDestroy, OnChanges, SimpleChanges, Input, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
declare var PIXI: any;

@Component({
  selector: 'anim-lib-shap4',
  templateUrl: './shap4.component.html',
  styleUrls: ['./shap4.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shap4Component implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('canvas') canvas: ElementRef;
  @Input() paused = false;
  @Input() autoWaves = false;

  public app: any;
  public stage: any;
  public circle: any;
  public circleMask: any;
  public container: any;
  // public circle = PIXI.Graphics;
  // public circleMask = PIXI.Graphics;

  FPS = 60;
  resolution = 1;
  ticker = new PIXI.ticker.Ticker();
  // renderer: any = PIXI.CanvasRenderer | PIXI.WebGLRenderer;
  // container = PIXI.Container;
  springs = [];
  storeY;
  extend = 0;
  fK = .95;
  particles: {
    x: number,
    y: number,
    xpos: number,
    ypos: number,
    origY: number,
    ay: number,
    vy: number,
    mass: number,
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
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    // this.changeDetector.detach();
    // console.log('this:' , this);
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initPixiApp();
    });
    this.rocket();
    // this.initPixiApp()
  }

//  ngOnChanges() {
//   console.log('ticker.start()');
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
      // view: this.canvas.nativeElement
    };

    


    this.app = new PIXI.Application(width, height, options);
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.domRender.appendChild(this.canvas.nativeElement, this.app.view);
    this.app.stage.interactive = true;

    this.container = new PIXI.Container();
    // app.stage.addChild(container);

    // this.app = new PIXI.Application(width, height, options);
    // this.app.renderer.view.style.display = 'block';
    // this.app.renderer.autoResize = true;
    // this.domRender.appendChild(this.canvas.nativeElement, this.app.view);
    // this.app.stage.interactive = true;

    // this.container = new PIXI.Container();
    // this.container.x = app.screen.width / 2;
    // this.container.y = app.screen.height / 2;

    this.initCircle();
    // this.ticker.start();
    this.ticker.add(this.onFrame, this);
    // const that = this;
    // this.onFrame(that);

    this.onWavesTickerFrame();
    
  }

  get canvasWidth() {
    return this.app.renderer.width / this.resolution;
  }
  get canvasHeight() {
    return this.app.renderer.height / this.resolution;
  }

  onFrame(_) {
    // console.log('that:' , that);
    // console.log('this:' , this);
    
    this.updateCircle();

    if (this.wavesTickerCounter == Math.ceil(500 / (1000 / this.FPS))) {
      this.wavesTickerCounter = 0;
      this.onWavesTickerFrame();
    } else {
      this.wavesTickerCounter++;
    }

    this.app.stage.addChild(this.container);
    // this.app.renderer.render(this.stage);

    if (this.paused) {
      this.ticker.stop();
    }
  }

  onWavesTickerFrame() {
    if (this.paused || !this.autoWaves) {
      return;
    }

    const particlesCount = this.particles.length;
    const target = this.rand(0, particlesCount - 1);
    let speed = -4;

    this.particles[this.mod(target - 3, particlesCount)].vy += speed / 8;
    this.particles[this.mod(target - 3, particlesCount)].vy += speed / 7;
    this.particles[this.mod(target - 3, particlesCount)].vy += speed / 6;
    this.particles[this.mod(target - 2, particlesCount)].vy += speed / 5;
    this.particles[this.mod(target - 1, particlesCount)].vy += speed / 4;
    this.particles[this.mod(target, particlesCount)].vy += speed / 3;
    this.particles[this.mod(target + 1, particlesCount)].vy += speed / 4;
    this.particles[this.mod(target + 2, particlesCount)].vy += speed / 5;
    this.particles[this.mod(target + 3, particlesCount)].vy += speed / 6;
    this.particles[this.mod(target + 3, particlesCount)].vy += speed / 7;
    this.particles[this.mod(target + 3, particlesCount)].vy += speed / 8;

    this.calculating = true;
  }

  onResize() {
    if (!this.app) {
      return;
    }

    const width = this.canvas.nativeElement.offsetWidth;
    const height = this.canvas.nativeElement.offsetHeight;

    this.app.renderer.resize(width, height);
    this.app.renderer.view.style.width = `${width}px`;
    this.app.renderer.view.style.height = `${height}px`;
    // this.renderer.resize(width, height);
    // this.renderer.view.style.width = `${width}px`;
    // this.renderer.view.style.height = `${height}px`;

    this.initCircle();

    this.calculating = true;
  }

  initCircle() {
    if (this.circle) {
      this.app.stage.removeChild(this.circle);
      // this.stage.removeChild(this.circle);
    }

    if (this.circleMask) {
      // this.stage.removeChild(this.circleMask);
      this.app.stage.removeChild(this.circleMask);
    }

    const total = Math.ceil(this.canvasWidth / 10);
    this.springs = [];
    this.particles = [];

    const space = (this.canvasWidth + this.extend) / total;
    let xpos = (space * .5) - (this.extend * .5);
    const ypos = 0;

    for (let i = 0; i < total; i++) {
      const particle = {
        x: xpos,
        y: ypos,
        xpos: xpos,
        ypos: ypos,
        origY: ypos,
        ay: 0,
        vy: 0,
        mass: 10
      };

      this.particles[this.particles.length] = particle;

      xpos += space;
    }

    this.storeY = this.mouseY;

    for (let u = 0; u < this.particles.length - 1; u++) {
      this.springs.push({ iLengthY: (this.particles[u + 1].y - this.particles[u].y) });
    }

    let texture = PIXI.Texture.fromImage('../../../assets/img/liquid-circle-background.jpg');

    this.circleRadius = this.canvasWidth / (2 * Math.PI);
    this.circle = new PIXI.Sprite(texture);

    this.circle.texture.update();
    this.circle.width = 1.5 * this.canvasWidth / Math.PI;
    this.circle.height = 1.5 * this.canvasWidth / Math.PI;
    this.circle.position.x = (this.canvasWidth - this.circle.width) / 2;
    this.circle.position.y = (this.canvasHeight - this.circle.height) / 2;

    this.circleMask = new PIXI.Graphics();
    this.circleMask.interactive = true;
     
    // this.circleMask.lineStyle(0);
    // this.circleMask.beginFill(0xFFFF0B, 0.5);
    // this.circleMask.drawCircle(470, 200,100);
    // this.circleMask.endFill();
    // this.circleMask.lineStyle(0);//
    // this.circleMask.beginFill(0xFFFF0B, 0.5);//
    // this.circleMask.drawCircle(this.canvasWidth / 2, this.canvasHeight / 2, this.circleRadius + 50);
    // this.circleMask.endFill();
    
    
    this.circleMask.hitArea = new PIXI.Circle(this.canvasWidth / 2, this.canvasHeight / 2, this.circleRadius + 50);
    this.circleMask.mousemove = data => {
      if (data.target != this.circleMask) {
        return;
      }
      console.log(data.data.global.x);
      

      this.mouseX = data.data.global.x;
      this.mouseY = data.data.global.y;

      this.mouseX = this.unprojectX(data.data.global.x, data.data.global.y, this.circleRadius) || 0;
      this.mouseY = this.unprojectY(this.mouseX, data.data.global.y, this.circleRadius);

      this.mouseMove();
    };

    this.circle.mask = this.circleMask;
    // this.circleMask.scale.set(0.7);
    // this.app.stage.addChild(this.circle);
    // this.app.stage.addChild(this.circleMask);
    this.app.stage.addChild(this.circle);
    this.app.stage.addChild(this.circleMask);

    this.initialDraw = true;
    // const graph = new PIXI.Graphics();
    // this.app.stage.addChild(graph);
    // graph.beginFill(0xFF3300);
    // graph.x = 200;
    // graph.y = 20;
    // graph.moveTo(0, 50);
    // graph.quadraticCurveTo(288, 0, 388, 150);
    // graph.endFill();
  }

  mod(x, y) {
    return x >= 0 ? x % y : x % y + y;
  }

  rand(from, to) {
    return Math.floor(Math.random() * to) + from;
  }

  mouseMove() {
    let particle = null;
    let smallestDist = Infinity;
    let target = null;

    let j = this.particles.length;
    while (--j > -1) {
      const dx = this.mouseX - this.particles[j].x;
      const dy = this.mouseY - this.particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < smallestDist) {
        particle = this.particles[j];
        smallestDist = dist;
        target = j;
      }
    }

    if (particle && this.mouseY > particle.y) {
      let speed = (this.mouseY - this.storeY) * 0.5;
      const particlesCount = this.particles.length;

      if (speed > 50) {
        speed = 50;
      } else if (speed < -50) {
        speed = -50;
      }

      this.particles[this.mod(target - 2, particlesCount)].vy = speed / 6;
      this.particles[this.mod(target - 1, particlesCount)].vy = speed / 5;
      this.particles[this.mod(target, particlesCount)].vy = speed / 3;
      this.particles[this.mod(target + 1, particlesCount)].vy = speed / 5;
      this.particles[this.mod(target + 2, particlesCount)].vy = speed / 6;

      this.storeY = this.mouseY;
      this.calculating = true;
    }
  }

  updateCircle() {
    if (!this.calculating) {
      return;
    }

    const changed = this.calculateCircle();

    if (!changed && !this.initialDraw) {
      this.calculating = false;
      return;
    }

    this.drawCircle();
  }

  calculateCircle() {
    let changed = false;

    for (let u = this.particles.length - 1; u >= 0; --u) {
      let fExtensionY = 0;
      let fForceY = 0;

      if (u > 0) {
        fExtensionY = this.particles[u - 1].y - this.particles[u].y - this.springs[u - 1].iLengthY;
        fForceY += -this.fK * fExtensionY;
      }

      if (u < this.particles.length - 1) {
        fExtensionY = this.particles[u].y - this.particles[u + 1].y - this.springs[u].iLengthY;
        fForceY += this.fK * fExtensionY;
      }

      fExtensionY = this.particles[u].y - this.particles[u].origY;
      fForceY += this.fK / 15 * fExtensionY;

      this.particles[u].ay = -fForceY / this.particles[u].mass;
      this.particles[u].vy += this.particles[u].ay;
      this.particles[u].ypos += this.particles[u].vy;
      this.particles[u].vy /= 1.04;

      if (!changed && (this.particles[u].vy >= 0.1 || this.particles[u].vy <= -0.1)) {
        changed = true;
      }
    }

    for (let u = 0; u < this.particles.length; u++) {
      this.particles[u].x = this.particles[u].xpos;
      this.particles[u].y = this.particles[u].ypos;
    }

    return changed;
  }

  drawCircle() {
    this.circleMask.clear();
    this.circleMask.beginFill(0x0);

    for (let u = 0; u < this.particles.length; u++) {
      if (u === 0) {
        const x = this.particles[u].xpos + (this.particles[u + 1].xpos - this.particles[u].xpos) / 2;
        const y = this.particles[u].ypos + (this.particles[u + 1].ypos - this.particles[u].ypos) / 2;

        this.circleMask.moveTo(
          this.projectX(x, y, this.circleRadius),
          this.projectY(x, y, this.circleRadius)
        );
      } else if (u < this.particles.length - 1) {
        const x = this.particles[u].xpos + (this.particles[u + 1].xpos - this.particles[u].xpos) / 2;
        const y = this.particles[u].ypos + (this.particles[u + 1].ypos - this.particles[u].ypos) / 2;

        this.circleMask.lineTo(
          this.projectX(x, y, this.circleRadius),
          this.projectY(x, y, this.circleRadius)
        );
      }
    }

    this.circleMask.endFill();
    this.initialDraw = false;
  }

  projectX(x, y, r) {
    const alpha = x / r;
    const ry = r + y;
    return ry * Math.sin(alpha) + this.canvasWidth / 2;
  }

  projectY(x, y, r) {
    const alpha = x / r;
    const ry = r + y;
    return ry * Math.cos(alpha) + this.canvasHeight / 2;
  }

  unprojectX(x, y, r) {
    let alpha = Math.asin((x - this.canvasWidth / 2) / r);

    if (y < this.canvasHeight / 2 && x >= this.canvasWidth / 2) {
      alpha = Math.PI - alpha;
    } else if (y < this.canvasHeight / 2 && x < this.canvasWidth / 2) {
      alpha = Math.PI - alpha;
    } else if (y >= this.canvasHeight / 2 && x < this.canvasWidth / 2) {
      alpha = Math.PI * 2 + alpha;
    }

    return alpha * r;
  }

  unprojectY(x, y, r) {
    const alpha = x / r;
    return (y - this.canvasHeight / 2) / Math.cos(alpha) - r;
  }

  rocket() {
    // let texture = PIXI.Texture.fromImage('../../../assets/img/usatoday/Rocket_space_ship.png');
    const rocket = PIXI.Sprite.fromImage('../../../assets/img/usatoday/Rocket_space_ship.png');

    
    // const rocket = new PIXI.Sprite(texture);
    rocket.anchor.set(0.5);
    rocket.scale.set(0.2);
    rocket.x = 100;
    rocket.y = this.app.screen.height - 100;
    this.app.stage.addChild(rocket);

  }

  drawCirc() {
    const graph = new PIXI.Graphics();
    this.app.stage.addChild(graph);
    graph.beginFill(0xFF3300);
    graph.x = 200;
    graph.y = 20;
    graph.moveTo(0, 50);
    graph.quadraticCurveTo(288, 0, 388, 150);
    graph.endFill();
  }


}
