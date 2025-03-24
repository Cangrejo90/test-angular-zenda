import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Character, FilterCharacter } from '../models/character';

@Injectable({
  providedIn: 'root'
})

export class RickAndMortyService {
  apiUrl = "https://rickandmortyapi.com/api/"
  constructor(private readonly http: HttpClient) { }

  getAllCharacter(): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}character`);
  }

  getFilterCharacter(filter:FilterCharacter): Observable<Character> {
    let parameterPath = "/?"

    if(filter.name !== ""){
      parameterPath += `name=${filter.name}`;
    }

    if(filter.status !== ""){
      parameterPath += `status=${filter.status}`;
    }

    return this.http.get<Character>(`${this.apiUrl}character${parameterPath}`);
  }

  navegatePagination(urlPagination:string): Observable<Character> {
    return this.http.get<Character>(`${urlPagination}`);
  }
}