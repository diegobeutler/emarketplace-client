import {Cidade} from "../../endereco/models/cidade";
import {Permissao} from "../../../shared/models/permissao";

export interface Usuario {
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

  cidade: Cidade;// ter um card de endereço
}
