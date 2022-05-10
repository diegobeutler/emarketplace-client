import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Usuario} from "../../../../usuario/models/usuario";
import {Observable, of} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take} from "rxjs/operators";

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent {
  @Input()
  usuario: Usuario;
  @Input()
  showDialogUsuario: boolean;
  @Output()
  showDialogUsuarioChange=  new EventEmitter<boolean>();

  constructor() {
  }

  getTooltip$(...values: any[]): Observable<string> {
    return of(values).pipe(
      debounceTime(200),
      map(value => {
        if (value[0]) {
          return value.join(" | ")
        }
        return "Selecione"
      }),
      distinctUntilChanged(),
      take(1)
    );
  }
}
