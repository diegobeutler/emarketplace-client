export interface CrudComponent<T> {

    loading: boolean;

    inicializar(): void;

    salvar(registro: T): void;

    carregar(registroId: number): void;

    remover(registroId: number): void;

    validarForm(): boolean;

}
