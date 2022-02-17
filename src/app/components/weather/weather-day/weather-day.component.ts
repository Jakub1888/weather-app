import { Component, Input, OnInit } from '@angular/core';
import { List } from 'src/app/_models/weather.model';

@Component({
  selector: 'app-weather-day',
  templateUrl: './weather-day.component.html',
  styleUrls: ['./weather-day.component.scss'],
})
export class WeatherDayComponent implements OnInit {
  @Input() day: List[] = [];
  columnsToDisplay = ['dates', 'temperatures'];
  averageTemp = 0;

  constructor() {}

  ngOnInit(): void {
    this.getAverageTemp();
    this.averageTemp = this.getAverageTemp();
    console.log(this.day);
  }

  getAverageTemp() {
    let average = 0;
    let count = 0;

    for (let day of this.day) {
      count++;
      average += day.main.temp;
    }

    average = +(average / count).toFixed(1);

    return average;
  }
}
