import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// shared
import {CrudService} from 'src/app/shared/components/crud/crud.service';
import {Anuncio} from "./models/anuncio";
import {AnuncioFilter} from "./list/filter/models/anuncioFilter";

// aplicação

@Injectable({providedIn: 'root'})// todo ver
export class AnuncioService extends CrudService<Anuncio> {

  constructor(public http: HttpClient) {
    super('anuncio', http);
  }

  findAnunciosByFilter(filter: AnuncioFilter): Observable<Anuncio[]> {
    return this.http.post<Anuncio[]>(`${this.baseUrl}${this.url}/filter`, filter);
  }

  convidarInstituicao(emailInstituicao: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${this.url}/convidar-instituicao`, emailInstituicao)
  }

  updateStatus(anuncio: Anuncio): Observable<Anuncio> {
    return this.http.post<Anuncio>(`${this.baseUrl}${this.url}/update-status`, anuncio);
  }
}
