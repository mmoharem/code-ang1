import { Component, OnInit } from '@angular/core';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: 'app-change-detect2',
  // templateUrl: './change-detect2.component.html',
  template: `
    <svg width="550" height="550"
         (mousedown)="mouseDown($event)"
         (mouseup)="mouseUp($event)"
         (mousemove)="mouseMove($event)" >
      <svg:g box *ngFor="let box of boxes" [box]="box"
        [selected]="box.id == currentId"
      ></svg:g>
    </svg>
  `,
  styleUrls: ['./change-detect2.component.scss']
})
export class ChangeDetect2Component implements OnInit {

  currentId = null;
  boxes = [];
  offsetX;
  offsetY;

  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 100; i++) {
      const id = i;
      const x = getRandomInt(0, 500);
      const y = getRandomInt(0, 500);
      const box = {
        id,
        x,
        y
      };
      this.boxes.push(box);
    }
  }

  mouseDown(event) {
    const id = Number(event.target.getAttribute("dataId"));
    const box = this.boxes[id];

    this.offsetX = box.x - event.clientX;
    this.offsetY = box.y - event.clientY;

    this.currentId = id;
  }

  mouseMove(event) {
    event.preventDefault();
    if(this.currentId !== null) {
      this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
    }
  }

  mouseUp() {
    this.currentId = null;
  }

  updateBox(id, x, y) {
    const box = this.boxes[id];
    this.boxes[id] = {id, x, y}
  }
  // updateBox(id, x, y) {
  //   const box = this.boxes[id];
  //   box.x = x;
  //   box.y =y;
  // }

}
