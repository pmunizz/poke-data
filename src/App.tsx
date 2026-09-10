import { useEffect, useState } from "react";
import { buscarPokemon } from "./services/pokiApi";
import {
  contarPokemonPorTipo,
  compararAtributos,
  type PokemonTypeCount,
  type PokemonStatsComparison,
} from "./utils/pokemonTransform";
import PokemonTypeChart from "./components/PokemonTypeChart";
import PokemonStatsChart from "./components/PokemonStatsChart";
import type { Pokemon } from "./types/pokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [dadosPorTipo, setDadosPorTipo] = useState<PokemonTypeCount[]>([]);
  const [dadosComparacao, setDadosComparacao] =
    useState<PokemonStatsComparison[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function carregarPokemons() {
      try {
        setLoading(true);
        setError(null);

        const nomes = ["pikachu", "charizard", "bulbasaur"];

        const resultados = await Promise.all(
          nomes.map((nome) => buscarPokemon(nome))
        );

        setPokemons(resultados);

        const dadosTransformados = contarPokemonPorTipo(resultados);
        setDadosPorTipo(dadosTransformados);

        const dadosDosAtributos = compararAtributos(resultados);
        setDadosComparacao(dadosDosAtributos);
      } catch (error) {
        setError("Não foi possível carregar os Pokémon.");
      } finally {
        setLoading(false);
      }
    }

    carregarPokemons();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (pokemons.length === 0) {
    return <h1>Nenhum Pokémon encontrado.</h1>;
  }

  return (
    <div>
      <h1>Pokémon Dashboard</h1>

      <PokemonTypeChart data={dadosPorTipo} />

      <PokemonStatsChart data={dadosComparacao} />

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