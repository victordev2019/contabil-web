export interface ItemPaginacao {
  id: 'primeira' | 'anterior' | 'atual' | 'proxima' | 'ultima';
  tipo: 'botao' | 'pagina';
  texto: string;
  ariaLabel?: string;
  desabilitado?: () => boolean;
  acao?: () => void;
}
