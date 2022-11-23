import { pokeapiService } from "./pokeapi/pokeapiService.js";
import { pokeapiCall } from "./pokeapi/pokeapiCalls.js";

/* GLOBAL VARS */
const MAX = 16;

var cardslist = [];

var PS = new pokeapiService();
var PC = new pokeapiCall();

var card_revelated = [];
/* EVENTOS */

$(document).ready(() => {
  loading_porcent(PS.list_data_pokemons, MAX / 2);
  PC.listByGeneration("generation-i").done(async (resp) => {
    let especies_pokemon = resp.pokemon_species;
    cardslist = await PS.ordenar_para_juego_memoria(especies_pokemon, MAX);

    set_cards();
    toggle_loading();

    $("div.poke_card").click((e) => {
      let card_actual_revelated = {
        id: e.currentTarget.attributes.pokemonID.value,
        card: e.currentTarget,
      };

      if (card_revelated.length < 2) {
        card_revelated.push(card_actual_revelated);

        console.log({ card_revelated });

        if (!is_fliped(card_actual_revelated.card)) {
          reveal_card(card_actual_revelated.card);

          if (
            card_revelated[1] &&
            card_revelated[0].id == card_revelated[1].id
          ) {
            // eliminar del tablero las cartas reveladas
            // TODO guardar pokemones "capturar"
            console.log("capturar pokemon " + card_revelated[0].id);
            hold()
          }
        }
      } else {
        // dar vuelta las cartas reveladas
        flip_all()
      }
    });

    console.log(cardslist, PS.list_data_pokemons);
  });
});

/* RENDER FUNCTIONS */

function set_cards() {
  cardslist.forEach((elem) => {
    let name_upper = elem.name.charAt(0).toUpperCase() + elem.name.slice(1);

    $("#poke_cards").append(
      `<div class="poke_card" 
        pokemonID="${elem.id}" 
        pokemonNAME="${elem.name}">

        <img class="poke_img" style="display:none" src="${elem.img}" alt="${name_upper}"/>
        <div class="poke_infoname" style="display:none">
          <span>${name_upper}</span>
        </div>

        <svg class="svg_flip" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="50 50 400 400" data-name="Layer 1" id="Layer_1"> 
          <path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z"/>
        </svg>
      </div>`
    );
  });
}

function flip_all() {

  flip_card(card_revelated[0].card);
  flip_card(card_revelated[1].card);

  card_revelated = [];
}

function hold() {
  card_revelated = [];
}

function reveal_card(card) {
  card.classList.add("flip");
  card.children[0].style.cssText = "display:block";
  card.children[1].style.cssText = "display:block";
  card.children[2].style.cssText = "display:none";
}

function flip_card(card) {
  card.classList.remove("flip");
  card.children[0].style.cssText = "display:none";
  card.children[1].style.cssText = "display:none";
  card.children[2].style.cssText = "display:block";
}

function is_fliped(card) {
  return card.classList.contains("flip");
}
