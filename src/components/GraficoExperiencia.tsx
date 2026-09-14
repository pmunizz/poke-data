import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { ExperienciaPokemon } from "../utils/TransformarPokemon";

interface GraficoExperienciaProps {
  dados: ExperienciaPokemon[];
}

function GraficoExperiencia({
  dados,
}: GraficoExperienciaProps) {
  return (
    <div className="grafico">
      <h2>Comparação de experiência base</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="nome" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="experiencia"
            name="Experiência"
            stroke="#2eaf7d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoExperiencia;