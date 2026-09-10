import { useEffect, useState } from "react";

import { buscarPokemon } from "./services/pokiApi";

import {
  contarPokemonPorTipo,
  compararAtributos,
  type PokemonTypeCount,
  type PokemonStatsComparison,
} from "./utils/pokemonTransform";

import PokemonTypeChart from "./components/PokemonTypeChart";

import type { Pokemon } from "./types/pokemon";

function App() {
  // Guarda a lista de Pokémon recebidos da API
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // Guarda os dados já transformados para o gráfico de tipos
  const [dadosPorTipo, setDadosPorTipo] = useState<PokemonTypeCount[]>([]);

  // Guarda os dados transformados para comparar os atributos
  const [dadosComparacao, setDadosComparacao] =
    useState<PokemonStatsComparison[]>([]);

  useEffect(() => {
    async function carregarPokemons() {
      const nomes = ["pikachu", "charizard", "bulbasaur"];

      // Busca os três Pokémon
      const resultados = await Promise.all(
        nomes.map((nome) => buscarPokemon(nome))
      );

      // Guarda os dados brutos dos Pokémon
      setPokemons(resultados);

      // Transforma os dados para descobrir
      // quantos Pokémon existem de cada tipo
      const dadosTransformados = contarPokemonPorTipo(resultados);

      // Guarda os dados transformados no estado
      setDadosPorTipo(dadosTransformados);

      // Transforma os stats dos Pokémon
      // em uma estrutura própria para comparação
      const dadosDosAtributos = compararAtributos(resultados);

      // Guarda os dados transformados no estado
      setDadosComparacao(dadosDosAtributos);

      console.log("Pokémons:", resultados);
      console.log("Pokémons por tipo:", dadosTransformados);
      console.log("Comparação de atributos:", dadosDosAtributos);
    }

    carregarPokemons();
  }, []);

  return (
    <div>
      <h1>Pokémon Dashboard</h1>

      {/* Gráfico com os dados tratados por tipo */}
      <PokemonTypeChart data={dadosPorTipo} />

      {/* Lista dos Pokémon */}
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <p>ID: {pokemon.id}</p>
          <p>Experiência: {pokemon.base_experience}</p>
        </div>
      ))}
    </div>
  );
}

export default App;