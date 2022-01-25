import {Cidade} from "../../endereco/models/cidade";
import {Permissao} from "../../../shared/models/permissao";

export class Usuario {
  id?: number;
  apelido: string;
  sobrenome: string;
  imagem: string;
  email: string;
  telefone: string;
  username: string;
  password: string;
  permissoes?: Permissao[];
  // interesses?: Categoria[];
  ehInstituicao: boolean;

  cidade: Cidade;// ter um card de endereço

  deleteImage: boolean;
}
