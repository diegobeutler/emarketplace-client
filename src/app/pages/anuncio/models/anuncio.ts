import {Cidade} from "../../endereco/models/cidade";
import {Permissao} from "../../../shared/models/permissao";
import {Operacao} from "../enumeration/operacao";
import {Status} from "../enumeration/status";
import {Usuario} from "../../usuario/models/usuario";
import {Categoria} from "./Categoria";

export class Anuncio {
  id?: number;
  titulo: string;
  descricao: string;
  caracteristicas: JSON[];// ver talvez usar um map<string, string>
  operacao: Operacao;
  status: Status;
  valor: number;
  dataPublicacao: Date;
  dataDevolocao: Date;
  produtosTroca: string;
  usuarioOrigem: Usuario;
  usuarioDestino: Usuario;
  usuarioInstituicao: Usuario;
  categoria: Categoria;

}
