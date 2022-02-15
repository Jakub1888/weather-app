import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-day',
  templateUrl: './weather-day.component.html',
  styleUrls: ['./weather-day.component.scss'],
})
export class WeatherDayComponent implements OnInit {
  @Input() day: any = [];

  constructor() {}

  ngOnInit(): void {}
}
