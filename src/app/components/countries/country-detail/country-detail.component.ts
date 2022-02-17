import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/country.service';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherInfo } from 'src/app/_models/weather.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetailComponent {
  weather$!: Observable<WeatherInfo>;

  constructor(
    private countryService: CountryService,
    private weatherService: WeatherService
  ) {}

  country$ = this.countryService.selectedCountry$.pipe(
    tap(
      (data) => (this.weather$ = this.weatherService.getWeather(data?.capital))
    )
  );
}
