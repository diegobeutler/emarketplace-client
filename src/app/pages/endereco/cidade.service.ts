import {Injectable} from "@angular/core";
import {CrudService} from "../../shared/components/crud/crud.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cidade} from "./models/cidade";

@Injectable()
export class CidadeService extends CrudService<Cidade>{
  constructor(public http: HttpClient) {
    super('cidade', http);
  }

  public completeByEstadoAndNome(idEstado: number, query: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.baseUrl}${this.url}/complete-by-estado-and-nome?idEstado=${idEstado}&query=${query}`)
  }
}
