import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {interval, Observable, Subject, Subscription} from 'rxjs';

// environment
import {environment} from 'src/environments/environment';


// aplicação
import {LoginRequest} from '../../shared/models/login-request';

@Injectable({ providedIn: 'root' })
export class LoginService {

    private _url = environment.api;

    private _loginEvent: Subject<boolean>;

    private _refreshSubscription?: Subscription;

    constructor(
        private _http: HttpClient,
        private _router: Router,
    ) {
        this._loginEvent = new Subject();
    }

    public get authInfo(): string | null {
        return localStorage.getItem('access_token');
    }

    public get isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }

    public login(request: LoginRequest): Observable<boolean> {
        return new Observable(observer => {
            if (!request) {
                observer.error({ message: 'É obrigatório informar um nome de usuário e uma senha para logar no sistema.' });
                observer.complete();
            }

            const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const body = 'username=' + request.username + '&password=' + request.password;

            this._http.post<{ access_token: string }>(this._url + 'login', body, { headers: headers }).subscribe(response => {
                this.storeToken(response);

                if (this.isAuthenticated) {
                    this.startRefreshInterval();
                }

                observer.next(this.isAuthenticated);
                observer.complete();
                window.location.replace('');
            }, error => {
                observer.error(error);
                observer.complete();
            })
        });
    }

    private storeToken(response?: { access_token: string }): void {
        const token = response ? response['access_token'] : null;

        if (token) {
            localStorage.setItem('access_token', token);
        } else {
            localStorage.removeItem('access_token')
        }

        this._loginEvent.next(this.isAuthenticated);
    }

    private startRefreshInterval(): void {
        if (this._refreshSubscription && !this._refreshSubscription.closed) {
            this._refreshSubscription.unsubscribe();
        }

        this._refreshSubscription = new Subscription();

        const source = interval(600000);
        const subRefresh = source.subscribe(() => this.refreshToken());

        this._refreshSubscription.add(subRefresh);
    }

    private stopRefreshInterval(): void {
        this._refreshSubscription?.unsubscribe();
    }

    private refreshToken(): void {
        this._http.get<{ access_token: string }>(this._url + 'refresh-token').subscribe(response => {
            this.storeToken(response);
        }, error => {
            this.storeToken();
            this.stopRefreshInterval();
        });
    }

    public logout() {
        localStorage.removeItem('access_token');
        this._loginEvent.next(false);
        this.stopRefreshInterval();
        this._router.navigateByUrl('').then(res => res);
        window.location.replace('');
    }

}
