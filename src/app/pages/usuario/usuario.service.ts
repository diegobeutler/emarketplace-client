import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// shared
import {CrudService} from 'src/app/shared/components/crud/crud.service';

// aplicação
import {Usuario} from './models/usuario';

@Injectable({providedIn: 'root'})// todo ver
export class UsuarioService extends CrudService<Usuario> {

  constructor(public http: HttpClient) {
    super('usuario', http);
  }

  /**
   * @description Retorna o usuário logado (se houver)
   */
  public logado(): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseUrl + this.url + '/logado');
  }

  // /**
  //  * @description Sobreescreve o método do CrudService para impedir requests indevidos
  //  */
  // public carregar(id: number): Observable<Usuario> {
  //   return this.logado();
  // }

  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {// TODO VER PARA MUDAR COMO SÃO AS DEMAIS REQUISIÇÕES
  //   const data: FormData = new FormData();
  //   data.append('file', file);
  //   const newRequest = new HttpRequest('POST', `${this.baseUrl}${this.url}/uploadFile`, data, {
  //     reportProgress: true,
  //     responseType: 'text'
  //   });
  //   return this.http.request(newRequest);
  // }

}
