export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;

  types: PokemonType[];

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