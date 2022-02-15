import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryListComponent } from './components/countries/country-list/country-list.component';
import { CountriesFilterPipe } from './components/countries/countries-filter.pipe';
import { CountryCardComponent } from './components/countries/country-card/country-card.component';
import { CountryDetailComponent } from './components/countries/country-detail/country-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { WeatherInfoComponent } from './components/weather/weather-info/weather-info.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WeatherListComponent } from './components/weather/weather-list/weather-list.component';
import { WeatherDayComponent } from './components/weather/weather-day/weather-day.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountriesFilterPipe,
    CountryCardComponent,
    CountryDetailComponent,
    NavigationComponent,
    WeatherInfoComponent,
    NotFoundComponent,
    WeatherListComponent,
    WeatherDayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
