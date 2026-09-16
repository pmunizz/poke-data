import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ComparacaoPokemon } from "../utils/TransformarPokemon";

interface GraficoAtaqueDefesaProps {
  dados: ComparacaoPokemon[]; // Props tipadas com TypeScript, que recebe um array de objetos do tipo ComparacaoPokemon, que contém informações sobre o nome, ataque e defesa de cada Pokémon
}

function GraficoAtaqueDefesa({
  dados,
}: GraficoAtaqueDefesaProps) {
  return (
    <div className="grafico">
      <h2>Comparação de Ataque e Defesa</h2>
      <p className="descricao-grafico">
        Comparação dos valores base de ataque e defesa.
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar // Cada Bar corresponde a uma propriedade dos objetos do array de dados, que são os atributos ataque e defesa de cada Pokémon
            dataKey="ataque"
            name="Ataque"
            fill="#e85d5d"
          />
          <Bar
            dataKey="defesa"
            name="Defesa"
            fill="#4f75ff"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoAtaqueDefesa;