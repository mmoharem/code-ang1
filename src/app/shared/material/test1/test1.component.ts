import { Component } from '@angular/core';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.scss']
})
export class Test1Component {

  categories = [
    { name: 'Beginners' },
    { name: 'Intermediate' },
    { name: 'Advanced' },
  ];

  progress = 0;
timer;

constructor() {
  this.timer = setInterval(() => {
    this.progress++;
    if(this.progress = 100) clearInterval(this.timer);
  }, 20);
}

onSelect(category) {
  this.categories
    .filter(c => c != category)
    .forEach(c => c['selected '] = false);

  category.selected = !category.selected;
}
}
