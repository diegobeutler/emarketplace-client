import {Operacao} from "../enumeration/operacao";
import {Status} from "../enumeration/status";
import {Usuario} from "../../usuario/models/usuario";
import {Categoria} from "../../categoria/models/categoria";
import {ImagemAnuncio} from "./imagemAnuncio";

export class Anuncio {
  id?: number;
  titulo: string;
  descricao: string;
  imagens: ImagemAnuncio[] = [];
  caracteristicas: JSON;// ver talvez usar um map<string, string>
  operacao: Operacao;
  status: Status;
  categoria: Categoria;
  valor: number;
  produtosTroca: string;
  dataPublicacao: Date;
  dataDevolocao: Date;
  usuarioOrigem: Usuario;
  usuarioDestino?: Usuario;
  usuarioInstituicao?: Usuario;

  // variáveis de controle
  readOnly: false;
  imagensDeleted: string[] = [];// talvez fazer no back

}
