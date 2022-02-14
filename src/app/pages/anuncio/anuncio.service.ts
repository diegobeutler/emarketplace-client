import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

// shared
import {CrudService} from 'src/app/shared/components/crud/crud.service';
import {Anuncio} from "./models/anuncio";

// aplicação

@Injectable({providedIn: 'root'})// todo ver
export class AnuncioService extends CrudService<Anuncio> {

  constructor(public http: HttpClient) {
    super('anuncio', http);
  }
}
