import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class LoaderService {

  private subjectShow: Subject<[boolean, string?]> = new Subject();

  show(show: boolean, message?: string): void {
    this.subjectShow.next([show, message]);
  }

  observableShow(): Observable<[boolean, string?]> {
    return this.subjectShow.asObservable();
  }

}
