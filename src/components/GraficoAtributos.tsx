import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Pokemon } from "../types/pokemon";

interface GraficoAtributosProps {
  pokemon: Pokemon;
}

function GraficoAtributos({ pokemon }: GraficoAtributosProps) {
  const dados = [];

  for (let i = 0; i < pokemon.stats.length; i++) {
    const item = pokemon.stats[i];

    dados.push({
      atributo: item.stat.name,
      valor: item.base_stat,
    });
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="atributo" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="valor"
          name="Valor"
          stroke="#6c63ff"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraficoAtributos;
