import {Injectable} from "@angular/core";
import {CrudService} from "../../shared/components/crud/crud.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categoria} from "./models/categoria";

@Injectable()
export class CategoriaService extends CrudService<Categoria>{
  constructor(public http: HttpClient) {
    super('categoria', http);
  }

  public completeByDescricao(query: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}${this.url}/complete-by-descricao?query=${query}`);
  }
}
