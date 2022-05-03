import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss']
})
export class CaracteristicasComponent implements OnInit {

  @Input()
  readOnly = false;
  @Input()
  isAnuncioCard = false;
  @Input()
  showDialogCaracteristicas: boolean;
  @Output()
  showDialogCaracteristicasChange=  new EventEmitter<boolean>();
  @Input()
  caracteristicas: Array<KeyValue<string, string>>;
  @Output()
  caracteristicasChange = new EventEmitter<Array<KeyValue<string, string>>>();

  constructor() { }

  ngOnInit(): void {
  }

  remover(rowIndex: number) {
    this.caracteristicas.splice(rowIndex,1);
  }

  adicionar() {
    this.caracteristicas.push({key:'', value:''})
  }

  change() {
    this.caracteristicasChange.emit(this.caracteristicas);
  }
}
