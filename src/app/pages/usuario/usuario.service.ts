import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// shared
import {CrudService} from 'src/app/shared/components/crud/crud.service';

// aplicação
import {Usuario} from './models/usuario';

@Injectable({providedIn: 'root'})
export class UsuarioService extends CrudService<Usuario> {

  constructor(public http: HttpClient) {
    super('usuario', http);
  }

  // public get novoRegistro(): Observable<Usuario> {
  //   return of({
  //     id: null,
  //     apelido: '',
  //     sobrenome: '',
  //     imagem: '',
  //     email: '',
  //     telefone: '',
  //     username: '',
  //     password: '',
  //     permissoes: null,
  //     cidade: null
  //   });
  // }

  /**
   * @description Retorna o usuário logado (se houver)
   */
  public logado(): Observable<Usuario> {
    return this.http.get<Usuario>(this.baseUrl + this.url + '/logado');
  }

  /**
   * @description Sobreescreve o método do CrudService para impedir requests indevidos
   */
  public carregar(id: number): Observable<Usuario> {
    return this.logado();
  }

}
