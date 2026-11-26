import { Lote } from "./lote.model";

export interface LancamentoModalData {
  modo: 'inclusao' | 'visualizacao';
  lote: Lote | null;
}
