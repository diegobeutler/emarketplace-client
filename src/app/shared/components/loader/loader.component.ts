import {Component} from "@angular/core";
import {LoaderService} from "./loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  show = false;
  message: string;

  constructor(private loaderService: LoaderService) {
    this.loaderService.observableShow().subscribe(e => {
      this.show = e[0];
      this.message = e[1] || 'Aguarde, carregando...';
    });
  }
}
