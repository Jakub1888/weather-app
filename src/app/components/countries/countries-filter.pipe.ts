import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countriesFilter',
})
export class CountriesFilterPipe implements PipeTransform {
  transform(countries: any, searchCountry: string): any {
    if (!countries) {
      return [];
    }
    if (!searchCountry) {
      return countries;
    }

    searchCountry = searchCountry.toLocaleLowerCase();

    return countries.filter((c: any) => {
      return c.name.toLocaleLowerCase().includes(searchCountry);
    });
  }
}
