# SWDev - Star Wars Explorer

Este projeto é um aplicativo front-end desenvolvido em Vue 3 com Vite, que consome a API do [SWAPI](https://swapi.dev/) para exibir personagens, naves e planetas do universo Star Wars. O sistema permite visualizar detalhes sobre cada item, favoritar personagens e editar os dados.

## Tecnologias Utilizadas

- **Vue 3** (com Composition API)
- **Vite** (para um desenvolvimento rápido e otimizado)
- **Axios** (para requisições HTTP)
- **PrimeFlex** (para estilização com classes utilitárias)
- **Vue Router** (para navegação entre páginas)
- **Pinia** (para gerenciamento de estado)

## Funcionalidades

- Listagem de personagens, planetas e naves de Star Wars
- Exibição de detalhes de cada item
- Favoritar personagens
- Edição de itens, com alterações refletidas na página principal
- Interface responsiva e intuitiva

## Como Rodar o Projeto

### 1. Instalação das Dependências
```sh
npm install
```
Ou, se estiver usando Yarn:
```sh
yarn install
```

### 2. Executar em Ambiente de Desenvolvimento
```sh
npm run dev
```
Ou:
```sh
yarn dev
```

### 3. Gerar Build para Produção
```sh
npm run build
```
Ou:
```sh
yarn build
```

## Estrutura do Projeto
```
├── src
│   ├── components  # Componentes reutilizáveis
│   ├── views       # Páginas principais
│   ├── store       # Gerenciamento de estado com Pinia
│   ├── router      # Configuração de rotas com Vue Router
│   ├── assets      # Imagens e estilos
│   ├── main.ts     # Arquivo principal
│   ├── App.vue     # Componente raiz
│
├── public          # Arquivos estáticos
├── package.json    # Configuração do projeto
├── vite.config.ts  # Configuração do Vite
```

## API Utilizada

A aplicação consome dados da [SWAPI](https://swapi.dev/), que fornece informações sobre personagens, planetas e naves do universo Star Wars.

## Contribuição

Sinta-se à vontade para contribuir com melhorias e novas funcionalidades! Basta clonar o repositório, criar uma branch para suas alterações e abrir um pull request.

Que a Força esteja com você! 🚀

