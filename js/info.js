import { pokeapiService } from "./pokeapi/pokeapiService.js";
import { pokeapiCall } from "./pokeapi/pokeapiCalls.js";

/* GLOBAL VARS */
const MAX = 30;
const color = [
  { id: "brown", name: "Marron" },
  { id: "pink", name: "Rosa" },
  { id: "red", name: "Rojo" },
  { id: "yellow", name: "Amarillo" },
  { id: "green", name: "Verde" },
  { id: "blue", name: "Azul" },
  { id: "purple", name: "Violeta" },
  { id: "black", name: "Negro" },
  { id: "gray", name: "Gris" },
  { id: "white", name: "Blanco" },
];

const types = [
  { id: "normal", name: "Normal", color: "gray" },
  { id: "fighting", name: "Pelea", color: "brown" },
  { id: "flying", name: "Volador", color: "lightblue" },
  { id: "poison", name: "Veneno", color: "purple" },
  { id: "ground", name: "Tierra", color: "brown" },
  { id: "rock", name: "Roca", color: "darkgray" },
  { id: "bug", name: "Bicho", color: "lime" },
  { id: "ghost", name: "Fantasma", color: "darkpurple" },
  { id: "steel", name: "Acero", color: "gray" },
  { id: "fire", name: "Fuego", color: "orange" },
  { id: "water", name: "Agua", color: "cyan" },
  { id: "grass", name: "Planta", color: "green" },
  { id: "electric", name: "Electrico", color: "gold" },
  { id: "psychic", name: "Psiquico", color: "yellow" },
  { id: "ice", name: "Hielo", color: "lightblue" },
  { id: "dragon", name: "Dragon", color: "red" },
  { id: "dark", name: "Siniestro", color: "black" },
  { id: "fairy", name: "Hada", color: "pink" },
  { id: "unknown", name: "Desconocido", color: "black" },
  { id: "shadow", name: "Sombra", color: "black" },
];

var selected_pokemon_data = {};
var cardslist = [];
var PS = new pokeapiService();
var PC = new pokeapiCall();

/* EVENTOS */

$(document).ready(() => {
  loading_porcent(PS.list_data_pokemons,MAX);
  PC.listByGeneration("generation-i").done(async (resp) => {
    let especies_pokemon = resp.pokemon_species;
    cardslist = await PS.ordenar_para_lista(especies_pokemon, MAX);

    render_cards();
    loading();

    $("div.poke_card").click(async (e) => {
      let attr = e.currentTarget.attributes;
      let id = attr.pokemonID.value;
      let name = attr.pokemonNAME.value;

      selected_pokemon_data = await PC.getSpecie(name);

      // speak("Pokemon numero " + id + " " + name);
      // speak(selected_pokemon_data.flavor_text_entries[0].flavor_text);

      console.log(selected_pokemon_data);

      render_info(id, name);
    });

    console.log(cardslist,PS.list_data_pokemons);

  });
});

/* RENDER FUNCTIONS */

function render_cards() {
  cardslist.forEach((elem) => {
    let pokemon_data = PS.list_data_pokemons.find((e) => e.name == elem.name);
    let tipos_html = get_tipo_html(pokemon_data);
    let name_upper = elem.name.charAt(0).toUpperCase() + elem.name.slice(1);
    $("#poke_cards").append(
      `<div class="poke_card" 
        pokemonID="${elem.id}" 
        pokemonNAME="${elem.name}"
      >             
        <img class="poke_img" src="${elem.img}" alt="${name_upper}"/>
        <div class="poke_infoname" >
          <span>${name_upper}</span>
          <hr>
          <span>${tipos_html}</span>
        </div>
      </div>`
    );
  });
}

function render_info(id, name) {
  let name_upper = name.charAt(0).toUpperCase() + name.slice(1);
  let pokemon_data = PS.list_data_pokemons.find((e) => e.id == id);

  let descriptions = selected_pokemon_data.flavor_text_entries.filter(
    (elem) => elem.language.name == "es"
  );

  let tipos_html = get_tipo_html(pokemon_data);

  let description_text = "";
  descriptions.forEach(
    (elem) =>
      (description_text += `<b>Pokemon ${elem.version.name}</b><p>
      ${elem.flavor_text}
      </p>`)
  );

  $("#modal_num").html("#" + id);
  $("#modal_title").html(name_upper);
  $("#modal_img").html(
    `<img src="${pokemon_data.sprites.other["official-artwork"].front_default}"/>`
  );

  $("#modal_info").html(`
        <ul>
          <li>Tipo: ${tipos_html}</li>
          <li>Peso: ${pokemon_data.weight}KGs</li>
          <li>Altura: ${pokemon_data.height}m</li>
        </ul>
        <p>
        ${description_text}
        </p>
        `);
  $("#modal_container").show();
}

function get_tipo_html(pokemon_data) {
  let tipo1 = types.find((elem) => elem.id == pokemon_data.types[0].type.name);
  let tipo1_html =
    "<span class='tipo' style='background:" +
    tipo1.color +
    "'>" +
    tipo1.name +
    "</span>";
  let tipo2,
    tipo2_html = "";
  if (pokemon_data.types[1]) {
    tipo2 = types.find((elem) => elem.id == pokemon_data.types[1].type.name);
    tipo2_html =
      "<span class='tipo' style='background:" +
      tipo2.color +
      "'>" +
      tipo2.name +
      "</span>";
  }

  return tipo1_html + " " + tipo2_html;
}