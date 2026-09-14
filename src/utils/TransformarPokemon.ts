import type { Pokemon } from "../types/pokemon";

export interface ContagemTipo {
  tipo: string;
  quantidade: number;
}

export interface ComparacaoPokemon {
  nome: string;
  ataque: number;
  defesa: number;
}

export function contarPokemonPorTipo(
  pokemons: Pokemon[]
): ContagemTipo[] {
  const contagem: Record<string, number> = {};

  pokemons.forEach((pokemon) => {
    pokemon.types.forEach((item) => {
      const tipo = item.type.name;

      contagem[tipo] = (contagem[tipo] || 0) + 1;
    });
  });

  const dados = Object.entries(contagem).map(
    ([tipo, quantidade]) => ({
      tipo,
      quantidade,
    })
  );

  return dados.sort(
    (a, b) => b.quantidade - a.quantidade
  );
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

  return dados.sort((a, b) => b.ataque - a.ataque);
}