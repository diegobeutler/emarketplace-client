export interface CrudComponent<T> {

    inicializar(): void;

    salvar(registro: T): void;

    carregar(registroId: number): void;

    remover(registroId: number): void;

    isValidForm(): boolean;

}
