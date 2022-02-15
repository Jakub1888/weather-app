import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailComponent } from './components/countries/country-detail/country-detail.component';
import { CountryListComponent } from './components/countries/country-list/country-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WeatherInfoComponent } from './components/weather/weather-info/weather-info.component';

const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  },
  {
    path: 'countries',
    component: CountryListComponent,
  },
  {
    path: 'countries/detail/:name',
    component: CountryDetailComponent,
  },
  {
    path: 'weather',
    component: WeatherInfoComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
