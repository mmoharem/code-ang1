import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-zones',
  // templateUrl: './zones.component.html',
  template: `
    <svg (mousedown)="mouseDown($event)"
         (mouseup)="mouseUp($event)"
         (mousemove)="mouseMove($event)" >
      <svg:g box *ngFor="let box of boxes" [box]="box">
      </svg:g>
    </svg>
  `,
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
