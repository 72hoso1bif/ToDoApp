import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  width: number;

  constructor() {
  }

  ngOnInit() {
  }

  setWidth(newWidth: number) {
    this.width = newWidth;
  }
}
