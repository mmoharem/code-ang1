import { Particle } from './particles';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main-canv1',
  template: `<anim-lib-canv1 [particles]="bobo"
              (click)="toggleChanging()" ></anim-lib-canv1>`
  // styleUrls: ['./main-canv1.component.scss']
})
export class MainCanv1Component implements OnInit, OnDestroy {

  bobo: Particle[] = [];
  private intervalId: any;

  constructor() { }

  ngOnInit() {
    this.generatePart();
  }

  ngOnDestroy() {
    if(this.isCahnaging()) {
      clearInterval(this.intervalId);
    }
  }

  isCahnaging() {
    return !!this.intervalId;
  }

  toggleChanging() {
    if(this.isCahnaging()) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    } else {
      this.intervalId = setInterval(() => this.generatePart(), 100);
    }
  }

  generatePart() {
    setTimeout(this.generatePart, 1000);
    this.bobo = [];
    for(let i = 0; i < 100000; i++){
      this.bobo.push({
        x: Math.random() * 500,
        y: Math.random() * 500
      });
    }
  }
}
