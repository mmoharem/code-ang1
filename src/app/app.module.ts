import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Test1Component } from './shared/material/test1/test1.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatComponentsModule } from "./shared/material/mat-components.module";
import { AnimLibComponent } from './anim-lib/anim-lib.component';
import { PixiComponent } from './anim-lib/pixi/pixi.component';
import { Pixi1Component } from './anim-lib/pixi/pixi1/pixi1.component';
import { Pixi2Component } from './anim-lib/pixi/pixi2/pixi2.component';
import { GsapComponent } from './anim-lib/gsap/gsap.component';
import { Gsap1Component } from './anim-lib/gsap/gsap1/gsap1.component';
import { Gsap2Component } from './anim-lib/gsap/gsap2/gsap2.component';


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
    Gsap2Component
  ],
  imports: [
    BrowserModule,
    MatComponentsModule
  ],
  providers: [
    BrowserAnimationsModule,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
