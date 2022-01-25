import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable()
export class FileService {
  constructor(public http: HttpClient) {
    }

  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {// TODO VER PARA MUDAR COMO SÃO AS DEMAIS REQUISIÇÕES
  //   const data: FormData = new FormData();
  //   data.append('file', file);
  //   const newRequest = new HttpRequest('POST', `${environment.api}file/uploadFile`, data);
  //   return this.http.request(newRequest);
  // }

  // pushFileToStorage(file: File): Observable<HttpEvent<{}>> {// TODO VER PARA MUDAR COMO SÃO AS DEMAIS REQUISIÇÕES
  //   const data: FormData = new FormData();
  //   data.append('file', file);
  //   const newRequest = new HttpRequest('POST', `${environment.api}file/uploadFile`, data, {
  //     reportProgress: true,
  //     responseType: 'text'
  //   });
  //   return this.http.request(newRequest);
  // }
  //no form
  // upload() {
  //   this.progress.percentage = 0;
  //
  //   // @ts-ignore
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //   this.fileService.pushFileToStorage(this.currentFileUpload).subscribe(e => {
  //     this.registro.imagem =this.registro.imagem;
  //   });
  // }

  delete(file: string): Observable<string> {
    return  this.http.post<string>(`${environment.api}file/deleteFile`,file);
  }
}
