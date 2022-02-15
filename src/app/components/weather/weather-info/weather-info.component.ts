import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherInfo } from 'src/app/_models/weather.model';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  searchForm!: FormGroup;
  weather$!: Observable<any>;
  countryName: string = '';
  errorMessage!: string;

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
          catchError((err) => {
            this.errorMessage = err.statusText;
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
