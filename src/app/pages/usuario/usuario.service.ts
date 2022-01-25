import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

// shared
import {CrudService} from 'src/app/shared/components/crud/crud.service';

// aplicação
import {Usuario} from './models/usuario';
import {PasswordDto} from "./update-password/dto/passwordDto";

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

  /**
   * @description Sobreescreve o método do CrudService para impedir requests indevidos
   */
  public carregar(id: number): Observable<Usuario> {
    return this.logado();
  }


  public enviarEmailResetPassword(username: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}${ this.url}/resetPassword`, username);
  }


  updatePassword(passwordDto: PasswordDto) {
    return this.http.post<any>(`${this.baseUrl}${ this.url}/updatePassword`, passwordDto);
  }
}
