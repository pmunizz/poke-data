import { useEffect, useState } from "react";

import "./App.css";

import { buscarPokemon } from "./services/pokiApi";

import {
  compararAtaqueDefesa,
} from "./utils/TransformarPokemon";

import GraficoAtaqueDefesa from "./components/GraficoAtaqueDefesa";
import GraficoAtributos from "./components/GraficoAtributos";

import type { Pokemon } from "./types/pokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState<string | null>(null);

  const [pokemonSelecionado, setPokemonSelecionado] =
    useState("pikachu");

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

  const dadosComparacao = compararAtaqueDefesa(pokemons);

  const maiorAtaque = dadosComparacao[0];

  const maiorDefesa = [...dadosComparacao].sort(
    (a, b) => b.defesa - a.defesa
  )[0];

  const pokemonAtual = pokemons.find(
    (pokemon) => pokemon.name === pokemonSelecionado
  );

  return (
    <div className="dashboard">
      <header className="cabecalho">
        <h1>Poke Data</h1>

        <p>
          Dashboard para visualização de dados da PokéAPI
        </p>
      </header>

      <section className="indicadores">
        <div className="indicador">
          <h3>Pokémon analisados</h3>

          <p>{pokemons.length}</p>
        </div>

        <div className="indicador">
          <h3>Maior ataque</h3>

          <p>{maiorAtaque.nome}</p>

          <span>{maiorAtaque.ataque}</span>
        </div>

        <div className="indicador">
          <h3>Maior defesa</h3>

          <p>{maiorDefesa.nome}</p>

          <span>{maiorDefesa.defesa}</span>
        </div>
      </section>

      <GraficoAtaqueDefesa dados={dadosComparacao} />

      <section className="grafico">
        <h2>Atributos por Pokémon</h2>

        <p className="descricao-grafico">
          Escolha um Pokémon para visualizar seus atributos.
        </p>

        <div className="seletor">
          <label htmlFor="pokemon">
            Pokémon:
          </label>

          <select
            id="pokemon"
            value={pokemonSelecionado}
            onChange={(event) =>
              setPokemonSelecionado(event.target.value)
            }
          >
            {pokemons.map((pokemon) => (
              <option
                key={pokemon.id}
                value={pokemon.name}
              >
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        {pokemonAtual && (
          <GraficoAtributos pokemon={pokemonAtual} />
        )}
      </section>

      <section className="secao-pokemon">
        <h2>Pokémon analisados</h2>

        <div className="carrossel-pokemon">
          {pokemons.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />

              <h3>{pokemon.name}</h3>

              <p>#{pokemon.id}</p>

              <div className="tipos">
                {pokemon.types.map((item) => (
                  <span
                    className={`tipo ${item.type.name}`}
                    key={item.type.name}
                  >
                    {item.type.name}
                  </span>
                ))}
              </div>

              <p>XP: {pokemon.base_experience}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;