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