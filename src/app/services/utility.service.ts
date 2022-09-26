import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { IGiphyResponse } from '../models/gif-response';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private readonly urlTrend = environment.urlTrending + environment.apiKey;
  private readonly urlSearch = environment.urlSearch + environment.apiKey;

  constructor(
    private http: HttpClient,
  ) { }

  public readonly gifCountOnPage: number = 9;

  getGiphyList(page: number = 0) {
    return this.http.get<IGiphyResponse>(`${this.urlTrend}&limit=${this.gifCountOnPage}&rating=g&offset=${page * this.gifCountOnPage}`);
  }

  searchGiphy(list: Array<string>, page: number = 0) {
    let query: string;
    if (list?.length > 1) {
      query = list.join('%2C');
    } else {
      query = list[0];
    }

    return this.http.get<IGiphyResponse>(`${this.urlSearch}&q=${query}&limit=${this.gifCountOnPage}&offset=${page * this.gifCountOnPage}&rating=g&lang=en`);
  }
}
