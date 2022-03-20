import {Component, Injector, OnInit} from '@angular/core';
import {SimpleCrudComponent} from "../../../shared/components/crud/simple-crud.component";
import {Anuncio} from "../models/anuncio";
import {AnuncioService} from "../anuncio.service";
import {KeyValue} from "@angular/common";
import {SelectItem} from "primeng/api";
import {OptionsUtils} from '../../../shared/utils/OptionsUtils';
import {Operacao} from "../enumeration/operacao";

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent extends SimpleCrudComponent<Anuncio> implements OnInit {
  uploadedFiles: any[] = [];
  caracteristicas: Array<KeyValue<string, string>>;
  operacoesOptions: SelectItem[];

  constructor(protected anuncioService: AnuncioService,
              injector: Injector) {
    super(anuncioService, injector);
    this.operacoesOptions = OptionsUtils.getOptions(Operacao);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.caracteristicas = this.arrayByJson(this.registro.caracteristicas);
  }

  onUpload($event: any) {
    this.registro.imagens = [];
    $event.files.forEach(file => {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.registro.imagens.push({url: (reader?.result as string)});
        }
        reader.readAsDataURL(file)
      }
    })
  }

  arrayByJson(json: JSON): Array<KeyValue<string, string>> {
    let array = new Array<KeyValue<string, string>>()
    for (var value in json) {
      array.push({key: value, value: json[value]});
    }
    return array;
  }

  jsonByArray(arr: Array<KeyValue<string, string>>): JSON {
    let jsonObject = {};
    arr.forEach((value) => {
      jsonObject[value.key] = value.value
    });
    return JSON.parse(JSON.stringify(jsonObject));
  }

  beforeSave() {
    this.registro.caracteristicas = this.jsonByArray(this.caracteristicas);
  }

  isValidForm(): boolean {
    if (!this.registro.imagens?.length) {
      this.messageService.add({severity: 'warn', detail: "Deve-se carregar ao menos uma imagem."});
      return false;
    }
    return super.isValidForm();
  }
}
