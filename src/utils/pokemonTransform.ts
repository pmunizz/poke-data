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
  [pokemonName: string]: string | number;
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

  return atributos.map((atributo) => {
    const resultado: PokemonStatsComparison = {
      atributo,
    };

    pokemons.forEach((pokemon) => {
      const stat = pokemon.stats.find(
        (stat) => stat.stat.name === atributo
      );

      resultado[pokemon.name] = stat?.base_stat ?? 0;
    });

    return resultado;
  });
}