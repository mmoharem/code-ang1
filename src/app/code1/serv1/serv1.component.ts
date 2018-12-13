import { scrollRevealL, scrollRevealR, tttt } from './serv1-animation';
import { Component, OnInit, AfterViewInit } from '@angular/core';
// declare var skrollr: any;

@Component({
  selector: 'code1-serv1',
  templateUrl: './serv1.component.html',
  styleUrls: ['./serv1.component.scss'],
  animations: [
    scrollRevealL, 
    scrollRevealR
  ]
})
export class Serv1Component implements OnInit, AfterViewInit {

  isHidden: boolean = true;

  show = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // skrollr.init();
  }

  onClick() {
    // console.log('clicked');
    
    // this.isHidden = !this.isHidden;
  }
}