import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy, Input } from '@angular/core';
import { TimelineLite, Power3 } from "gsap";

@Component({
  // selector: 'app-ani1',
  selector: 'profile-details',
  templateUrl: './ani1.component.html',
  styleUrls: ['./ani1.component.scss']
})
export class Ani1Component implements OnInit, AfterViewInit, OnDestroy {

  @Input() user;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('main') main: ElementRef;
  @ViewChild('profileImageBorder') profileImageBorder: ElementRef;
  @ViewChild('profileImage') profileImage: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('title') title: ElementRef;

  @ViewChildren('statsIcon') statsIconQueryList: QueryList<ElementRef>;
  statsIcons: Element[] = [];
  @ViewChildren('statsText') statsTextQueryList: QueryList<ElementRef>;
  statsTexts: Element[] = [];

  timeline: TimelineLite;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.timeline = new TimelineLite();

    this.statsIconQueryList.map((elementRef) => {
      this.statsIcons.push(elementRef.nativeElement);
    });
    
    this.statsTextQueryList.map((elementRef) => {
      this.statsTexts.push(elementRef.nativeElement);
    });
  }

  ngOnDestroy() {
    this.timeline.kill();
    this.timeline = null;
  }

  

  anime() {
    this.timeline
      .add('start')
      .from(this.wrapper.nativeElement, .15, { opacity: 0 }, 'start')
      .to(this.wrapper.nativeElement, .3, { rotationX: 0, y: 0, z: 0,  ease: Power3.easeIn}, 'start')
      .add('image', '-=0.1')
      .add('main', '-=0.15')
      .add('icons', '-=0.1')
      .add('text', '-=0.05')
      .from(this.profileImageBorder.nativeElement, .3, { scale: 0 }, 'image')
      .from(this.profileImage.nativeElement, .3, { scale: 0, delay: .05 }, 'image')
      .from(this.main.nativeElement, .4, { y: '100%' }, 'main')
      .staggerFrom([this.username.nativeElement, this.title.nativeElement], .3, { opacity: 0, left: 50 }, 0.1, 'image')
      .staggerFrom(this.statsIcons, .3, { opacity: 0, top: 10 }, 0.1, 'icons')
      .staggerFrom(this.statsTexts, .3, { opacity: 0 }, 0.1, 'text')
      .play();
  }

}
