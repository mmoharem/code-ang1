import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { TweenLite } from "gsap";

export interface User {
  name: string;
  title: string,
  location: string,
  hearts: number,
  views: number
}

@Component({
  selector: 'learn-anime-anime1',
  templateUrl: './anime1.component.html',
  styleUrls: ['./anime1.component.scss']
})
export class Anime1Component implements OnInit, AfterViewInit {

  @ViewChild('button1') btn1: ElementRef;

  showProfileDetails: boolean = false;
  user: User;

  constructor(private elRef: Renderer2,
              ) { }

  ngOnInit() {
    this.user = {
      name: 'Dominic Elm',
      title: 'Frontend Developer',
      location: 'Germany',
      hearts: 235,
      views: 23500
    };
  }

  ngAfterViewInit() {
    // this.jsAnime();
  }

  // jsAnime() {
  //   var btn1 = document.querySelector('button');

  //   btn1.addEventListener('click', () => {
  //     TweenLite.to('div',0.6, {left: 200});
  //   });
  // }

  // angAnime(e) {
  //   // console.log(e.target);
  //   TweenLite.to('div',0.6, {left: 200});
  // }

  toggleProfileDetails() {
    this.showProfileDetails = !this.showProfileDetails;
  }

}
