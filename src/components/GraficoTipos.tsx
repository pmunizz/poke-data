import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { ContagemTipo } from "../utils/TransformarPokemon";

interface GraficoTiposProps {
  dados: ContagemTipo[];
}

function GraficoTipos({ dados }: GraficoTiposProps) {
  return (
    <div className="grafico">
      <h2>Quantidade de Pokémon por tipo</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="tipo" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="quantidade"
            name="Quantidade"
            fill="#4f75ff"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoTipos;