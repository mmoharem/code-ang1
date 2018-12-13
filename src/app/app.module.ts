import { Animate1Directive } from './code1/shared/directive/animate1.directive';
import { PixiC3BackgroundComponent } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3-background.component';
import { PixiC3Sub2Component } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3-sub2.component';
import { ParticlesService2 } from './anim-lib/canvas/particls2/particles2.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Test1Component } from './shared/material/test1/test1.component';


import { MatComponentsModule } from "./shared/material/mat-components.module";
import { AnimLibComponent } from './anim-lib/anim-lib.component';
import { PixiComponent } from './anim-lib/pixi/pixi.component';
import { Pixi1Component } from './anim-lib/pixi/pixi1/pixi1.component';
import { Pixi2Component } from './anim-lib/pixi/pixi2/pixi2.component';
import { GsapComponent } from './anim-lib/gsap/gsap.component';
import { Gsap1Component } from './anim-lib/gsap/gsap1/gsap1.component';
import { Gsap2Component } from './anim-lib/gsap/gsap2/gsap2.component';
import { LearnComponent } from './learn/learn.component';
import { ChangeDetectComponent } from './learn/change-detect/change-detect.component';
import { ZonesComponent } from './learn/zones/zones.component';
import { ChangeDetect2Component } from './learn/change-detect2/change-detect2.component';
import { BoxComponent } from './learn/change-detect2/box.component';
import { Shap4Component } from './anim-lib/pixi/shap4/shap4.component';
import { AnimeComponent } from './learn/anime/anime.component';
import { Anime1Component } from './learn/anime/anime1/anime1.component';
import { Ani1Component } from './learn/anime/anime1/ani1/ani1.component';
import { CanvasComponent } from './anim-lib/canvas/canvas.component';
import { Canv1Component } from './anim-lib/canvas/canv1/canv1.component';
import { MainCanv1Component } from './anim-lib/canvas/canv1/main-canv1.component';
import { Canv2Component } from './anim-lib/canvas/canv2/canv2.component';
import { Particls1Component } from './anim-lib/canvas/particls1/particls1.component';
import { ParticlesService } from './anim-lib/canvas/particls1/particles.service';
import { Particls2Component } from './anim-lib/canvas/particls2/particls2.component';
import { Particls3Component } from './anim-lib/canvas/particls3/particls3.component';
import { Particle4Component } from './anim-lib/canvas/particle4/particle4.component';
import { Particls4Component } from './anim-lib/canvas/particls4/particls4.component';
import { Pixi3Component } from './anim-lib/pixi/pixi3/pixi3.component';
import { Pixi4Component } from './anim-lib/pixi/pixi4/pixi4.component';
import { PixiCompComponent } from './pixi-comp/pixi-comp.component';
import { PixiCont1Component } from './pixi-comp/pixi-cont1/pixi-cont1.component';
import { PixiC1Component } from './pixi-comp/pixi-cont1/pixi-c1/pixi-c1.component';
import { PixiC2Component } from './pixi-comp/pixi-cont1/pixi-c2/pixi-c2.component';
import { PixiC3Component } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3.component';
import { Pixi1Service } from './pixi-comp/pixi-cont1/shared/services/pixi1.service';
import { PixiC4Component } from './pixi-comp/pixi-cont1/pixi-c4/pixi-c4.component';
import { PixiC3Sub1Component } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3-sub1.component';
import { PixiC3LiquidCircleComponent } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3-liquid-circle.component';
import { CssComponent } from './anim-lib/css/css.component';
import { AtomeOrbitComponent } from './anim-lib/css/atome-orbit/atome-orbit.component';
import { PixiC3Sub3Component } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3-sub3.component';
import { Learn3dComponent } from './anim-lib/css/learn3d/learn3d.component';
import { PixiC3ContentComponent } from './pixi-comp/pixi-cont1/pixi-c3/pixi-c3-content-component';
import { Code1Component } from './code1/code1.component';
import { About1Component } from './code1/about1/about1.component';
import { Serv1Component } from './code1/serv1/serv1.component';
import { BetterScroll1Directive } from './code1/shared/directive/better-scroll1.directive';
import { Scroll1Directive } from './code1/shared/directive/scroll1.directive';
import { Serv2Component } from './code1/serv2/serv2.component';
import { WebDesComponent } from './code1/serv/web-des/web-des.component';
import { AppDevComponent } from './code1/serv/app-dev/app-dev.component';
import { ECommComponent } from './code1/serv/e-comm/e-comm.component';


@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    AnimLibComponent,
    PixiComponent,
    Pixi1Component,
    Pixi2Component,
    GsapComponent,
    Gsap1Component,
    Gsap2Component,
    LearnComponent,
    ChangeDetectComponent,
    ZonesComponent,
    ChangeDetect2Component,
    BoxComponent,
    Shap4Component,
    AnimeComponent,
    Anime1Component,
    Ani1Component,
    CanvasComponent,
    Canv1Component,
    MainCanv1Component,
    Canv2Component,
    Particls1Component,
    Particls2Component,
    Particls3Component,
    Particle4Component,
    Particls4Component,
    Pixi3Component,
    Pixi4Component,
    PixiCompComponent,
    PixiCont1Component,
    PixiC1Component,
    PixiC2Component,
    PixiC4Component,
    PixiC3Component,
    PixiC3BackgroundComponent,
    PixiC3ContentComponent,
    PixiC3Sub1Component,
    PixiC3Sub2Component,
    PixiC3Sub3Component,
    PixiC3LiquidCircleComponent,
    CssComponent,
    AtomeOrbitComponent,
    Learn3dComponent,
    Code1Component,
    About1Component,
    Serv1Component,
    Animate1Directive,
    BetterScroll1Directive,
    Scroll1Directive,
    Serv2Component,
    //serve
    WebDesComponent,
    AppDevComponent,
    ECommComponent
  ],
  imports: [
    BrowserModule,
    MatComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    
    ParticlesService,
    ParticlesService2,
    Pixi1Service
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
