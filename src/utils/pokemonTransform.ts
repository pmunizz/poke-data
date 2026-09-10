import type { Pokemon } from "../types/pokemon";

export interface PokemonTypeCount {
  tipo: string;
  quantidade: number;
}

export function contarPokemonPorTipo(
  pokemons: Pokemon[]
): PokemonTypeCount[] {
  const contagem: Record<string, number> = {};

  pokemons.forEach((pokemon) => {
    pokemon.types.forEach((item) => {
      const tipo = item.type.name;

      contagem[tipo] = (contagem[tipo] || 0) + 1;
    });
  });

  return Object.entries(contagem).map(([tipo, quantidade]) => ({
    tipo,
    quantidade,
  }));
}

export interface PokemonStatsComparison {
  atributo: string;
  pikachu: number;
  charizard: number;
  bulbasaur: number;
}

export function compararAtributos(
  pokemons: Pokemon[]
): PokemonStatsComparison[] {
  const atributos = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  return atributos.map((atributo) => ({
    atributo,

    pikachu:
      pokemons
        .find((pokemon) => pokemon.name === "pikachu")
        ?.stats.find((stat) => stat.stat.name === atributo)?.base_stat ?? 0,

    charizard:
      pokemons
        .find((pokemon) => pokemon.name === "charizard")
        ?.stats.find((stat) => stat.stat.name === atributo)?.base_stat ?? 0,

    bulbasaur:
      pokemons
        .find((pokemon) => pokemon.name === "bulbasaur")
        ?.stats.find((stat) => stat.stat.name === atributo)?.base_stat ?? 0,
  }));
}