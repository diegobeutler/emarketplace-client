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

  public enviarEmailResetPassword(username: string): Observable<void>{
    return this.http.post<any>(`${this.baseUrl}${ this.url}/resetPassword`, username);
  }

  updatePassword(passwordDto: PasswordDto): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}${ this.url}/updatePassword`, passwordDto);
  }

  validarCadastro(id: number):  Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${ this.url}/validate`, id);
  }

  completeByInstituicaoAndNome(query: string): Observable<Usuario[]> {
    return  this.http.get<Usuario[]>(`${this.baseUrl}${ this.url}/complete-by-instituicao-and-nome?query=${query}`)
  }
}
