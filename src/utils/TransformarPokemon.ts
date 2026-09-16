import type { Pokemon } from "../types/pokemon";

export interface ComparacaoPokemon {
  nome: string;
  ataque: number;
  defesa: number;
}

export function compararAtaqueDefesa(pokemons: Pokemon[]): ComparacaoPokemon[] {
  const dados = pokemons.map((pokemon) => {
    const ataque = pokemon.stats.find((item) => item.stat.name === "attack");
    const defesa = pokemon.stats.find((item) => item.stat.name === "defense");

    let valorAtaque = 0;
    if (ataque) {
      valorAtaque = ataque.base_stat;
    }

    let valorDefesa = 0;
    if (defesa) {
      valorDefesa = defesa.base_stat;
    }

    return {
      nome: pokemon.name,
      ataque: valorAtaque,
      defesa: valorDefesa,
    };
  });

  return dados.sort((a, b) => b.ataque - a.ataque);
}