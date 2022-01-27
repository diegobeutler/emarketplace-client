import {Component} from "@angular/core";
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  show = false;
  message = "Aguarde, carregando..."

  constructor(private loaderService: LoaderService) {
    this.loaderService.observableShow().subscribe(value => {
      this.show = value;
    });
  }
}
