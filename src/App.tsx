import { useEffect, useState } from "react";
import "./App.css";
import { buscarPokemon } from "./services/pokiApi";
import { compararAtaqueDefesa } from "./utils/TransformarPokemon";
import GraficoAtaqueDefesa from "./components/GraficoAtaqueDefesa";
import GraficoAtributos from "./components/GraficoAtributos";
import type { Pokemon } from "./types/pokemon";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [pokemonSelecionado, setPokemonSelecionado] = useState("pikachu");

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

        const resultados = [];

        for (let i = 0; i < nomes.length; i++) {
          const pokemon = await buscarPokemon(nomes[i]);
          resultados.push(pokemon);
        }

        setPokemons(resultados);
      } catch (error) {
        setErro("Não foi possível carregar os Pokémon. Tente novamente.");
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

  const dadosComparacao = compararAtaqueDefesa(pokemons); // Função que retorna um array de objetos com nome, ataque e defesa de cada Pokémon

  const maiorAtaque = dadosComparacao[0];

  let maiorDefesa = dadosComparacao[0];

  for (let i = 1; i < dadosComparacao.length; i++) {
    if (dadosComparacao[i].defesa > maiorDefesa.defesa) {
      maiorDefesa = dadosComparacao[i];
    }
  }

  const pokemonAtual = pokemons.find(
    // Encontra o Pokémon selecionado pelo usuário no array de pokemons, comparando o nome do Pokémon com o valor selecionado no seletor
    (pokemon) => pokemon.name === pokemonSelecionado,
  );

  return (
    <div className="dashboard">
      <header className="cabecalho">
        <h1>Poke Data</h1>
        <p>Dashboard para visualização de dados da PokéAPI</p>
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
          <label htmlFor="pokemon">Pokémon:</label>

          <select
            id="pokemon"
            value={pokemonSelecionado}
            onChange={(event) =>
              // event representa o evento de mudança do select
              // event.target representa o <select> que foi alterado
              // event.target.value pega o valor da opção escolhida
              // setPokemonSelecionado atualiza o estado com o novo valor
              setPokemonSelecionado(event.target.value)
            }
          >
            {pokemons.map((pokemon) => (
              <option
                key={pokemon.id} //Criação da key quando cria vários elementos usando map
                value={pokemon.name}
              >
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        {pokemonAtual && ( //Se pokemonAtual existir, mostra o componente.
          <GraficoAtributos pokemon={pokemonAtual} /> // prop pokemon com valor atual
        )}
      </section>

      <section className="secao-pokemon">
        <h2>Pokémon analisados</h2>

        <div className="carrossel-pokemon">
          {pokemons.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />

              <h3>{pokemon.name}</h3>

              <p>#{pokemon.id}</p>

              <div className="tipos">
                {pokemon.types.map((item) => (
                  <span
                    className={`tipo ${item.type.name}`} // Define as classes CSS: "tipo" + o nome do tipo
                    key={item.type.name} // Define uma chave única para cada tipo
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
