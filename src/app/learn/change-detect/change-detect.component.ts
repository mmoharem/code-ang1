import { Component, OnInit, NgZone } from '@angular/core';


@Component({
  selector: 'app-change-detect',
  // templateUrl: './change-detect.component.html',
  template: `
    <h3>progress: {{ progress }}<h3>
    <button (click)="processWithinAngularZone()">
      Process within angular zone
    </button>
    <button (click)="processOutsideAngular()">
      Process outside angular zone
    </button>
  `,
  styleUrls: ['./change-detect.component.scss']
})
export class ChangeDetectComponent implements OnInit {

  progress: number = 0;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  processWithinAngularZone() {
    this.progress = 0; 
    this.increaseProgress(() => console.log('Done'))
  }

  processOutsideAngular() {
    this.progress = 0;
    this.zone.runOutsideAngular(() => {
      this.increaseProgress(() => {
        this.zone.run(() => {
          console.log('outside Done!');
        });
      });
    });
  }
  
  increaseProgress(doneCallback: () => void) {
    this.progress +=1;
    console.log(`Current progress: ${this.progress}%`);
    
    if(this.progress < 100) {
      window.setTimeout(() => {
        this.increaseProgress(doneCallback);
        // this.progress += 1;
      }, 3);
    } else {
      doneCallback();
    }
  }

  

}
