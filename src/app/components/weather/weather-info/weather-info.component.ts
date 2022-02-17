import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherInfoComponent implements OnInit {
  searchForm!: FormGroup;
  weather$!: Observable<any>;
  sunriseSunsetTime;

  private errorMessageSubject = new Subject<any>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.weather$ = this.weatherService
        .getWeather(this.searchForm.value.city)
        .pipe(
          tap(
            (weatherData) =>
              (this.sunriseSunsetTime = {
                sunrise: new Date(weatherData.city.sunrise * 1000),
                sunset: new Date(weatherData.city.sunset * 1000),
              })
          ),
          catchError((err) => {
            this.errorMessageSubject.next(err);
            console.error(err);
            return EMPTY;
          })
        );
    }
  }

  private initForm() {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
    });
  }
}
