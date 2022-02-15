import { Component, ViewChildren } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CountryService } from 'src/app/services/country.service';
import { Country } from '../../../_models/country.model';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent {
  errorMessage = '';
  searchCountry: string = '';
  @ViewChildren('filteredCountries') filteredCountries!: Country[];
  filtered: number = 21;

  constructor(private CountryService: CountryService) {}

  countries$ = this.CountryService.countries$.pipe(
    //tap((data) => console.log(data)),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  filterCountries() {
    this.filtered = this.filteredCountries.length;
  }

  onSelected(countryId: number) {
    this.CountryService.selectedCountryChanged(countryId);
  }
}
