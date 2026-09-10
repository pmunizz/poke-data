import { useEffect, useState } from "react";

import { buscarPokemon } from "./services/pokiApi";

import { contarPokemonPorTipo } from "./utils/pokemonTransform";

import type { Pokemon } from "./types/pokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function carregarPokemons() {
      const nomes = ["pikachu", "charizard", "bulbasaur"];

      const resultados = await Promise.all(
        nomes.map((nome) => buscarPokemon(nome))
      );

      // Guarda os Pokémon no estado
      setPokemons(resultados);

      // Transforma os dados para descobrir
      // quantos Pokémon existem de cada tipo
      const dadosPorTipo = contarPokemonPorTipo(resultados);

      console.log("Pokémons:", resultados);
      console.log("Pokémons por tipo:", dadosPorTipo);
    }

    carregarPokemons();
  }, []);

  return (
    <div>
      <h1>Pokémon Dashboard</h1>

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