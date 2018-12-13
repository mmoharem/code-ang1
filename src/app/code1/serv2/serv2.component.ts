import { scrollRevealL, scrollRevealR, tttt } from './serv2-animation';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'code1-serv2',
  templateUrl: './serv2.component.html',
  styleUrls: ['./serv2.component.scss'],
  animations: [
    scrollRevealL, 
    scrollRevealR
  ]
})
export class Serv2Component implements OnInit, AfterViewInit {

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
