import { useEffect, useState } from "react";

import "./App.css";

import { buscarPokemon } from "./services/pokiApi";

import {
  contarPokemonPorTipo,
  organizarExperiencia,
} from "./utils/TransformarPokemon";

import GraficoTipos from "./components/GraficoTipos";
import GraficoExperiencia from "./components/GraficoExperiencia";

import type { Pokemon } from "./types/pokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarPokemons() {
      try {
        setCarregando(true);

        setErro(null);

        const nomes = [
          "pikachu",
          "charizard",
          "bulbasaur",
          "squirtle",
          "gengar",
          "eevee",
          "snorlax",
          "lucario",
          "greninja",
          "mewtwo",
        ];

        const resultados = await Promise.all(
          nomes.map((nome) => buscarPokemon(nome))
        );

        setPokemons(resultados);
      } catch (error) {
        setErro(
          "Não foi possível carregar os Pokémon. Tente novamente."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarPokemons();
  }, []);

  if (carregando) {
    return (
      <div className="estado">
        <div className="spinner"></div>

        <p>Carregando Pokémon...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="estado">
        <h2>Ops!</h2>

        <p>{erro}</p>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="estado">
        <h2>Nenhum Pokémon encontrado</h2>

        <p>Não existem dados disponíveis para exibição.</p>
      </div>
    );
  }

  const dadosTipos = contarPokemonPorTipo(pokemons);

  const dadosExperiencia = organizarExperiencia(pokemons);

  return (
    <div className="dashboard">
      <header className="cabecalho">
        <h1>Poke Data</h1>

        <p>
          Dashboard para visualização de dados da PokéAPI
        </p>
      </header>

      <GraficoTipos dados={dadosTipos} />

      <GraficoExperiencia dados={dadosExperiencia} />

      <section className="secao-pokemon">
        <h2>Pokémon analisados</h2>

        <div className="lista-pokemon">
          {pokemons.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />

              <h3>{pokemon.name}</h3>

              <p>#{pokemon.id}</p>

              <p>
                Tipo:{" "}
                {pokemon.types
                  .map((item) => item.type.name)
                  .join(", ")}
              </p>

              <p>
                XP: {pokemon.base_experience}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;