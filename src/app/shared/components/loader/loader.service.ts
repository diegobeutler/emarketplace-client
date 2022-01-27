import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class LoaderService {

  private subjectShow: Subject<boolean> = new Subject();

  show(show: boolean): void {
    this.subjectShow.next(show);
  }

  observableShow(): Observable<boolean> {
    return this.subjectShow.asObservable();
  }

}
