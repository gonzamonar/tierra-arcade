import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  API_URL: string = 'https://pokeapi.co/api/v2/';

  constructor(
    private http: HttpClient
  ) { }

  
  pokemon(pokemon: number): Observable<any>{
    return this.http.get(this.API_URL +'pokemon/' + pokemon + "/");
  }
  

}


