import {Operacao} from "../../../enumeration/operacao";
import {Usuario} from "../../../../usuario/models/usuario";
import {Status} from "../../../enumeration/status";
import {Categoria} from "../../../../categoria/models/categoria";
import {Estado} from "../../../../endereco/models/estado";
import {Cidade} from "../../../../endereco/models/cidade";

export class AnuncioFilter {

  id: number;
  titulo: string;
  descricao: string;
  operacao: Operacao;
  status: Status;
  autor: Usuario;
  adquirente: Usuario;
  dataPublicacaoMin: Date;
  dataPublicacaoMax: Date;
  categoria: Categoria;
  estado: Estado;
  cidade: Cidade;

}
