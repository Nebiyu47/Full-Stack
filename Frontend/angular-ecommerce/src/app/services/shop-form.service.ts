import { State } from './../common/state';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from '../common/country';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {
  private countriesUrl = "http://localhost:8080/api/countries";
  private stateUrl = "http://localhost:8080/api/states";
  constructor(private HttpClient: HttpClient) { }
  getCountries(): Observable<Country[]>{
    return this.HttpClient.get<GetRespondCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }
  getStates(theCountryCode: string): Observable<State[]>{
    const searStaeZipCode=`${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`
    return this.HttpClient.get<GetRespondStates>(this.countriesUrl).pipe(
      map(response => response._embedded.state)
    );
  }
  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth)
    }
    return of(data);

  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }

}
interface GetRespondCountries {
  _embedded: {
    countries: Country[];
  }
}
interface GetRespondStates{
  _embedded: {
    state: State[];
  }
}
