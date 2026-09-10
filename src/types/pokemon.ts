export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  order: number;
  is_default: boolean;
  types: PokemonType[];
  stats: PokemonStat[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}