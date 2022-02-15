import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { combineLatest, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Country } from '../_models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  base_url = `https://restcountries.com/v2/`;

  countries$ = this.http.get<Country[]>(this.base_url + 'all').pipe(
    map((countries) =>
      countries.map((country, index) => ({
        id: index,
        ...country,
      }))
    ),
    catchError(this.handleError)
  );

  private countrySelectedSubject = new Subject<number>();
  countrySelectedAction$ = this.countrySelectedSubject.asObservable();

  selectedCountry$ = combineLatest([
    this.countries$,
    this.countrySelectedAction$,
  ]).pipe(
    map(([countries, selectedCountryId]) =>
      countries.find((country) => country.id === selectedCountryId)
    )
  );

  constructor(private http: HttpClient) {}

  getCountry(countryName: string): Observable<any> {
    return this.http
      .get<Country[]>(`${this.base_url}/name/${countryName}`)
      .pipe(
        map((c) => c[0]),
        catchError(this.handleError)
      );
  }

  selectedCountryChanged(selectedCountryId: number) {
    this.countrySelectedSubject.next(selectedCountryId);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.message}`;
    } else {
      console.error(err);

      errorMessage = `Backend error ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
