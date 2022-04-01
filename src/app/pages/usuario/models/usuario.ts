import {Cidade} from "../../endereco/models/cidade";
import {Permissao} from "../../../shared/models/permissao";

export class Usuario {
  id?: number;
  nome: string;
  sobrenome: string;
  imagem: string;
  email: string;
  telefone: string;
  username: string;
  password: string;
  permissoes?: Permissao[];
  // interesses?: Categoria[];
  cidade: Cidade;// ter um card de endereço
  ativo: boolean;

  //variáveis de controle
  ehInstitution: boolean;
  vadationInstitution = false;
  deleteImage: boolean;
}
