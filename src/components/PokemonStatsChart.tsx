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

import type { PokemonStatsComparison } from "../utils/pokemonTransform";

interface PokemonStatsChartProps {
  data: PokemonStatsComparison[];
}

function PokemonStatsChart({ data }: PokemonStatsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="atributo" />
        <YAxis />
        <Tooltip />
        <Legend />

        {Object.keys(data[0] || {})
          .filter((key) => key !== "atributo")
          .map((pokemonName) => (
            <Bar key={pokemonName} dataKey={pokemonName} />
          ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PokemonStatsChart;