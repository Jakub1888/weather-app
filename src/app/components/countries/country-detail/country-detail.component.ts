import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/country.service';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherInfo } from 'src/app/_models/weather.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  countryName!: any;
  weather$!: Observable<WeatherInfo[]>;
  errorMessage = '';

  constructor(
    private countryService: CountryService,
    private weatherService: WeatherService
  ) {}

  country$ = this.countryService.selectedCountry$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    }),
    tap((data) => (this.weather$ = this.weatherService.getWeather(data?.name)))
  );
}
