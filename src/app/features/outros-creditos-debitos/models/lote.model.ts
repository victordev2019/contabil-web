
export type SituacaoLote = 'ABERTO' | 'ENVIADO' | 'CONFIRMADO';

export interface Lote {
  idLote: number;
  dataEntrada: string;
  valorLote: number;
  quantidadeLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string | null;
  situacaoLote: SituacaoLote;
  dataHoraSituacaoLote: string;
  instituicaoResponsavel: string;
  instituicao: string;
}

export interface LoteFiltros {
  instituicaoResponsavel: string;
  instituicao: string;
  situacaoLote: SituacaoLote | 'TODAS';
  idLoteDe: number | null;
  idLoteAte: number | null;
  valorLoteDe: number | null;
  valorLoteAte: number | null;
  dataEntradaDe: Date | null;
  dataEntradaAte: Date | null;
}
