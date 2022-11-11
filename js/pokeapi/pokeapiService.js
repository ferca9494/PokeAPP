import { pokeapiCall } from "./pokeapiCalls.js";

export class pokeapiService {
  list_data_pokemons = []

  async setCardElements(elem) {
    var PC = new pokeapiCall()
    var poke = await PC.getPokemon(elem.name);
    this.list_data_pokemons.push(poke)
    return {
      id: elem.url.split("/")[6],
      name: elem.name,
      img: poke.sprites.front_default,
    };
  }

  async ordenar_para_juego_memoria(list, MAX) {
    let elements = [];

    for (let i = 0; i < MAX / 2; i++) {
      var random_id = Math.floor(Math.random() * list.length);
      var elem = list[random_id];

      var pokeCardData = await this.setCardElements(elem);

      elements.push(pokeCardData);
      elements.push(pokeCardData);
    }
    elements.sort(() => (Math.random() > 0.5 ? 1 : -1));
    return elements;
  }

  async ordenar_para_lista(list, MAX) {
    list.sort((e1, e2) => {
      let id1 = e1.url.split("/")[6];
      let id2 = e2.url.split("/")[6];
      return id1 - id2;
    });

    let elements = [];

    for (let i = 0; i < MAX; i++) {
      var elem = list[i];
      var pokeCardData = await this.setCardElements(elem);

      elements.push(pokeCardData);
    }
    return elements;
  }
}
