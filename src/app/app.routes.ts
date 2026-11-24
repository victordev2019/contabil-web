
import { Routes } from '@angular/router';

import { Layout } from './layout/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/outros-creditos-debitos/pages/lote-listagem/lote-listagem')
            .then((m) => m.LoteListagem),
      },
    ],
  },
];
