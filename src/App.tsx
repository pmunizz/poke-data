import { useEffect, } from "react";
import { buscarPokemon } from "./services/pokiApi";

function App() {
  useEffect(() => {
    async function carregarPokemon() {
      const pokemon = await buscarPokemon("pikachu");

      console.log(pokemon);
    }

    carregarPokemon();
  }, []);

  return (
    <div>
      <h1>Pokémon Dashboard</h1>
    </div>
  );
}

export default App;