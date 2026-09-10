export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  order: number;
  is_default: boolean;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}