import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { City } from './city';
import { Country } from './../countries/country';
import { ApiResult, MainService } from '../main.service';

@Injectable({
  providedIn: 'root',
})
export class CityService
  extends MainService<City> {
  constructor(
    http: HttpClient) {
    super(http);
  }

  getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null
  ): Observable<ApiResult<City>> {
    var url = this.getUrl("https://localhost:40443/api/Cities");
    var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterColumn && filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<ApiResult<City>>(url, { params });
  }

  get(id: number): Observable<City> {
    var url = this.getUrl("https://localhost:40443/api/Cities/" + id);
    return this.http.get<City>(url);
  }

  put(item: City): Observable<City> {
    var url = this.getUrl("https://localhost:40443/api/Cities/" + item.id);
    return this.http.put<City>(url, item);
  }

  post(item: City): Observable<City> {
    var url = this.getUrl("https://localhost:40443/api/Cities");
    return this.http.post<City>(url, item);
  }

  getCountries(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null
  ): Observable<ApiResult<Country>> {
    var url = this.getUrl("https://localhost:40443/api/Countries");
    var params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterColumn && filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<ApiResult<Country>>(url, { params });
  }

  isDupeCity(item: City): Observable<boolean> {
    var url = this.getUrl("https://localhost:40443/api/Cities/IsDupeCity");
    return this.http.post<boolean>(url, item);
  }
}
