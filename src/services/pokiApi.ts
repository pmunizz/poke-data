import axios from "axios";
import type { Pokemon } from "../types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function buscarPokemon(nome: string): Promise<Pokemon> {
  const response = await api.get<Pokemon>(`/pokemon/${nome}`);

  return response.data;
}