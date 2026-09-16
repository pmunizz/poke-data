import axios from "axios";
import type { Pokemon } from "../types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export async function buscarPokemon(nome: string): Promise<Pokemon> {
  const resposta = await api.get(`/pokemon/${nome}`);
  const pokemon: Pokemon = resposta.data;
  return pokemon;
}