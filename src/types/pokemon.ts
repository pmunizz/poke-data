export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;

  types: PokemonType[];

  stats: PokemonStat[];

  sprites: {
    front_default: string;
  };
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

  stat: {
    name: string;
    url: string;
  };
}