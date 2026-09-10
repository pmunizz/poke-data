import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { PokemonTypeCount } from "../utils/pokemonTransform";

interface PokemonTypeChartProps {
  data: PokemonTypeCount[];
}

function PokemonTypeChart({ data }: PokemonTypeChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="tipo" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="quantidade" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PokemonTypeChart;