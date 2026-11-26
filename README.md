# ContabilWeb

Aplicação web desenvolvida para o gerenciamento e consulta de lotes de Outros Créditos/Débitos, permitindo pesquisar registros, visualizar informações e incluir lançamentos.

O projeto foi desenvolvido como parte de um teste técnico, utilizando Angular e Angular Material, com dados simulados em memória.

## Tecnologias utilizadas

- Angular 22
- TypeScript
- Angular Material
- SCSS
- RxJS
- Signals
- Reactive Forms
- Jest
- ESLint (angular-eslint)

## Funcionalidades

### Consulta de Lotes

- Pesquisa de lotes utilizando filtros.
- Filtros por instituição responsável, instituição, situação, ID, valor e data de entrada.
- Seleção individual e seleção de todos os registros da página.
- Paginação dos resultados.
- Formatação de valores monetários e datas no padrão brasileiro.
- Barra de ações com controle de habilitação conforme a quantidade de registros selecionados.
- Indicador de carregamento durante a pesquisa.
- Mensagem para quando nenhum resultado for encontrado.

### Inclusão e visualização de lançamentos

- Modal para inclusão de lançamentos.
- Consulta de conta corrente utilizando dados simulados.
- Exibição do titular da conta localizada.
- Formulário com validações reativas.
- Campos para valor, histórico, estorno, documento, descrição, situação e PA.
- Visualização dos dados completos do lote e dos lançamentos associados.
- Inclusão de novos lotes na tabela principal, com os dados essenciais para identificação.

## Organização do projeto

A estrutura foi organizada por funcionalidades, separando componentes, modelos, serviços e dados simulados.

```text
src/
└── app/
    ├── features/
    │   └── outros-creditos-debitos/
    │       ├── components/
    │       │   ├── lancamento-modal/
    │       │   ├── lote-acoes/
    │       │   ├── lote-filtros/
    │       │   └── lote-tabela/
    │       ├── mocks/
    │       ├── models/
    │       ├── pages/
    │       └── services/
    └── shared/
```

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- Angular CLI

### Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone <URL_DO_REPOSITORIO>
cd contabil-web
```

Instale as dependências:

```bash
npm install
```

### Servidor de desenvolvimento

Execute:

```bash
ng serve
```

Acesse http://localhost:4200/.

A aplicação será atualizada automaticamente quando os arquivos forem modificados.

## Dados simulados (Mock)

O projeto utiliza arquivos JSON e serviços Angular para simular a comunicação com uma API.

As consultas são realizadas por meio de Observables, utilizando `of()` e `delay()` para simular o comportamento assíncrono de uma requisição HTTP.

Os lançamentos incluídos são mantidos em memória durante a execução da aplicação. Não há integração com backend ou persistência em banco de dados.

## Decisões de implementação

- Os componentes foram separados por responsabilidade, facilitando a manutenção e reutilização.
- Os filtros e formulários utilizam Reactive Forms.
- Signals são utilizados para gerenciamento de estados locais da interface.
- A tabela possui seleção individual e seleção por página, respeitando a paginação.
- A inclusão de um lançamento gera um novo lote na tabela principal, exibindo apenas os dados essenciais.
- As informações completas do lote e seus lançamentos ficam disponíveis na ação Visualizar.
- As ações Alterar e Excluir foram mantidas na interface conforme os requisitos, sem implementação de operações não especificadas funcionalmente.

## Build

Para gerar a versão de produção:

```bash
ng build
```

Os arquivos compilados serão disponibilizados no diretório `dist/`.

## Testes

Para executar os testes unitários:

```bash
npm test
```

O projeto utiliza Jest como executor de testes.

## Qualidade de código e lint

O projeto utiliza ESLint integrado ao Angular por meio do `angular-eslint`, permitindo identificar problemas de código, inconsistências e possíveis más práticas.

Para executar a análise estática:

```bash
ng lint
```

Para tentar corrigir automaticamente os problemas compatíveis com autofix:

```bash
ng lint --fix
```

## Recursos adicionais

- [Angular](https://angular.dev/)
- [Angular Material](https://material.angular.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [RxJS](https://rxjs.dev/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
