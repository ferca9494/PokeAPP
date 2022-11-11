import { request } from "../global/request.js";

export function find_poke(name) {
  return request("https://pokeapi.co/api/v2/pokemon/" + name);
}

export function list_poke_colour(color) {
  return request("https://pokeapi.co/api/v2/pokemon-color/" + color);
}

export function list_poke_gen(gen) {
  return request("https://pokeapi.co/api/v2/generation/" + gen);
}

export function find_poke_species(name) {
  return request("https://pokeapi.co/api/v2/pokemon-species/" + name);
}

export class pokeapiCall {
  getPokemon(name) {
    return request("https://pokeapi.co/api/v2/pokemon/" + name);
  }

  getSpecie(name) {
    return request("https://pokeapi.co/api/v2/pokemon-species/" + name);
  }

  listByColour(color) {
    return request("https://pokeapi.co/api/v2/pokemon-color/" + color);
  }

  listByGeneration(gen) {
    return request("https://pokeapi.co/api/v2/generation/" + gen);
  }
}
