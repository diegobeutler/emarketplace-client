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

  //
  // /**
  //  * @description Sobreescreve o método do CrudService para impedir requests indevidos
  //  */
  // // @ts-ignore todo melhorar
  // public carregar(id: number): Observable<Usuario> {
  //   this.logado().subscribe(e => {
  //     const ehAdmin = e.permissoes?.find(p => p.nome=='ROLE_ADMIN');
  //     if(ehAdmin){
  //       return super.carregar(id);
  //     } else{
  //       return this.logado();
  //     }
  //   },
  //   error => {return this.logado()});
  // }


  public enviarEmailResetPassword(username: string): Observable<void>{
    return this.http.post<any>(`${this.baseUrl}${ this.url}/resetPassword`, username);
  }

  updatePassword(passwordDto: PasswordDto): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}${ this.url}/updatePassword`, passwordDto);
  }

  validarCadastro(id: number):  Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${ this.url}/validate`, id);
  }
}
