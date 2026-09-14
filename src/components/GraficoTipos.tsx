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

      <p className="descricao-grafico">
        Distribuição dos tipos encontrados nos Pokémon analisados.
      </p>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={dados}
          layout="vertical"
          margin={{
            left: 30,
            right: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            allowDecimals={false}
          />

          <YAxis
            dataKey="tipo"
            type="category"
            width={80}
          />

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