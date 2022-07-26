
import {request} from "../global/request.js"

export function find_poke(name) {
    return request("https://pokeapi.co/api/v2/pokemon/" + name)
}

export function list_poke_colour(color) {
    return request("https://pokeapi.co/api/v2/pokemon-color/" + color)
}

export function list_poke_gen(gen) {
    return request("https://pokeapi.co/api/v2/generation/" + gen)
}
