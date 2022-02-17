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
  searchCountry: string = '';
  @ViewChildren('filteredCountries') filteredCountries!: Country[];
  filtered: number = 21;
  selectedCountry$ = this.CountryService.selectedCountry$;
  errorMessage$ = this.CountryService.errorMessage$;

  constructor(private CountryService: CountryService) {}

  countries$ = this.CountryService.countries$.pipe(
    catchError((err) => {
      this.CountryService.setError(err);
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
