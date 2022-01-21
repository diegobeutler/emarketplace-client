import {Injectable} from "@angular/core";
import {CrudService} from "../../shared/components/crud/crud.service";
import {Estado} from "./models/estado";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class EstadoService extends CrudService<Estado>{
  constructor(public http: HttpClient) {
    super('estado', http);
  }

  public completeByNomeOrUf(query: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseUrl}${this.url}/complete-by-nome-or-uf?query=${query}`)
  }
}
