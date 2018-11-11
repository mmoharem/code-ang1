import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { TimelineMax } from 'gsap';

@Component({
  selector: 'anim-lib-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PixiComponent implements OnInit, AfterViewInit {

  @ViewChild('liquid_circle') liquidCircle: ElementRef;

  visible = true;
  autoWaves = false;
  isRun = true;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() {
    // this.animate();
    // setTimeout(() => {
    //   this.animate();
    // }, 1000);
  }

  
  setVisible(visible) {
    this.visible = visible;
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }

  animate() {
    new TimelineMax({
      onComplete: () => {
        this.autoWaves = true;
        this.detectChanges();
      }
    })
    .to(this.liquidCircle.nativeElement, 1, {
      scale: 1
    });

    }
}
