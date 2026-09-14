import type { Pokemon } from "../types/pokemon";

export interface ContagemTipo {
  tipo: string;
  quantidade: number;
}

export interface ExperienciaPokemon {
  nome: string;
  experiencia: number;
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

  return Object.entries(contagem).map(([tipo, quantidade]) => ({
    tipo,
    quantidade,
  }));
}

export function organizarExperiencia(
  pokemons: Pokemon[]
): ExperienciaPokemon[] {
  const dados = pokemons.map((pokemon) => ({
    nome: pokemon.name,
    experiencia: pokemon.base_experience,
  }));

  return dados.sort(
    (a, b) => a.experiencia - b.experiencia
  );
}