import { request } from "../global/request.js";

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
