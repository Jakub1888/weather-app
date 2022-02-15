import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Weather, WeatherInfo } from '../_models/weather.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  API_key = environment.API_key;

  constructor(private http: HttpClient) {}

  getWeather(location: any): Observable<any> {
    return this.http
      .get<any>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${this.API_key}`
      )
      .pipe(
        map((weatherData) => ({
          ...weatherData,
          list: weatherData.list.reduce((days: any, row: any) => {
            const date = row.dt_txt.split(' ')[0];
            days[date] = [...(days[date] ? days[date] : []), row];

            return days;
          }, []),
        }))
      );
  }
}
