export interface Lancamento {
  contaCorrente: string;
  titular: string;
  valor: number;
  historico: string;
  estorno: boolean;
  documento: string;
  descricao: string;
  situacao: string;
  pa: string;
}

export interface ContaCorrente {
  numero: string;
  titular: string;
}
