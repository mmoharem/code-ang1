import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'anim-lib-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  rune: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
