import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate, keyframes, state, query } from '@angular/animations';
import { pens, paper, plant } from './about1-animation';
// declare var skrollr: any;

@Component({
  selector: 'code1-about1',
  templateUrl: './about1.component.html',
  styleUrls: ['./about1.component.scss'],
  animations: [
    pens,
    paper,
    plant
  ]
})
export class About1Component implements OnInit, AfterViewInit {

  isHidden: boolean = true;

  show = false;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // skrollr.init();
  }

  onClick() {
    this.isHidden = !this.isHidden;
    console.log('clicked');
    
  }
}
