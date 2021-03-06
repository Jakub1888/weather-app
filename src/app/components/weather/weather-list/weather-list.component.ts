import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { List } from 'src/app/_models/weather.model';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherListComponent implements OnInit {
  @Input() weatherDays: any;
  sunriseSunset = {};
  weekdays: string[] = [];
  daysArr: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getDayName();
  }

  getDayName() {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    for (let day in this.weatherDays.list) {
      this.daysArr.push(this.weatherDays.list[day]);
    }

    for (let i = 0; i < this.daysArr.length; i++) {
      let day = new Date(this.daysArr[i][0].dt * 1000);
      let dayName = days[day.getDay()];

      this.weekdays.push(dayName);
    }
  }
}
