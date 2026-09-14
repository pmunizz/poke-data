# Poke Data

O **Poke Data** é uma aplicação web desenvolvida com **React + TypeScript** que consome dados da **PokéAPI** e apresenta essas informações em formato de dashboard.

O objetivo do projeto é praticar consumo de APIs REST, tratamento de dados, componentização, tipagem com TypeScript e visualização de dados com gráficos.

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Axios
- Recharts
- PokéAPI
- CSS

## Funcionalidades

- Busca de dados de Pokémon através da PokéAPI
- Exibição de um gráfico com a quantidade de Pokémon por tipo
- Exibição de um gráfico comparando a experiência base dos Pokémon
- Lista com imagem, nome, ID, tipo e experiência dos Pokémon analisados
- Estado de carregamento
- Mensagem de erro em caso de falha na API
- Estado vazio caso nenhum dado seja retornado

## Fonte de dados

Os dados utilizados no projeto são obtidos através da PokéAPI.

A aplicação utiliza informações como:

- nome
- ID
- tipo
- experiência base
- imagem

## Arquitetura do projeto

A aplicação foi organizada separando responsabilidades:

```text
src/
│
├── App.tsx
├── App.css
│
├── components/
│   ├── GraficoTipos.tsx
│   └── GraficoExperiencia.tsx
│
├── services/
│   └── pokiApi.ts
│
├── types/
│   └── pokemon.ts
│
└── utils/
    └── TransformarPokemon.ts