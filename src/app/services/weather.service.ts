import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather, WeatherInfo } from '../_models/weather.model';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  API_key = environment.API_key;

  constructor(private http: HttpClient) {}

  getWeather(location: any): Observable<WeatherInfo> {
    return this.http
      .get<WeatherInfo>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${this.API_key}`
      )
      .pipe(
        map((weatherData) => ({
          ...weatherData,
          list: weatherData.list.reduce((days: any, row: any) => {
            const date = row.dt_txt.split(' ')[0];
            days[date] = [...(days[date] ? days[date] : []), row];

            return days;
          }, []),
        })),

        shareReplay(1)
      );
  }
}
