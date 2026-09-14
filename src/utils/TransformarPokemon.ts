import type { Pokemon } from "../types/pokemon";

export interface ComparacaoPokemon {
  nome: string;
  ataque: number;
  defesa: number;
}

export function compararAtaqueDefesa(
  pokemons: Pokemon[]
): ComparacaoPokemon[] {
  const dados = pokemons.map((pokemon) => {
    const ataque = pokemon.stats.find(
      (item) => item.stat.name === "attack"
    );

    const defesa = pokemon.stats.find(
      (item) => item.stat.name === "defense"
    );

    return {
      nome: pokemon.name,
      ataque: ataque?.base_stat ?? 0,
      defesa: defesa?.base_stat ?? 0,
    };
  });

  return dados.sort(
    (a, b) => b.ataque - a.ataque
  );
}