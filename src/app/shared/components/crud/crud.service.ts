import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs";

// environment
import {environment} from "src/environments/environment";

@Injectable()
export abstract class CrudService<T> {

    /**
     * @description Armazena a url base do sistema
     */
    public baseUrl = environment.api;

    constructor(
        @Inject('url') public url: string,
        public http: HttpClient,
    ) { }

    public salvar(registro: T): Observable<T> {
        return this.http.post<T>(this.baseUrl + this.url, registro);
    }

    public pesquisarTodos(): Observable<T[]> {
        return this.http.get<T[]>(this.baseUrl + this.url + '/pesquisar-todos');
    }

    public carregar(id: number): Observable<T> {
        return this.http.get<T>(this.baseUrl + this.url + '/' + id);
    }

    public remover(id: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + this.url + '/' + id);
    }

}
