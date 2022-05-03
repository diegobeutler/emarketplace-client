import {HttpErrorResponse} from "@angular/common/http";


export function errorTransform(error: HttpErrorResponse): string {
  if (error) {
    if (error.error && error.error.message && error.status != 403) {
      return error.error.message;
    }
    if (error.message) {
      switch (error.status) {
        case 401:
          return 'Token expirado. Favor autentique-se novamente no sistema.'
        case 403:
          return 'Acesso negado. Usuário não possui as permissões necessárias.'

        default:
          return error.message;
      }
    }
  }
  return 'Não foi possível concluir a operação. Por favor, tente novamente mais tarde ou entre em contato com o suporte técnico.';
}
