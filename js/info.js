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
var cardslist_original = [];
var cardslist = [];
var PS = new pokeapiService();
var PC = new pokeapiCall();
var actual_filter = 0;
var actual_generation = 1;
var actual_filter_color = 0;
var actual_filter_type = 0;
/* EVENTOS */

$(document).ready(async () => {
  
  await filtrar_porGeneracion(1)

});

$("#filter").click(function (e) {
  let options = ["ALL", "CAP", "TYP", "COL"];

  if (actual_filter == options.length - 1) actual_filter = 0;
  else actual_filter++;

  $("#filter").html(options[actual_filter]);

  switch (actual_filter) {
    case 0:
      cardslist = cardslist_original
      render_cards()
      break;
    case 1:
      break;
    case 2:
      $("#fil_type").show();
      break;
    case 3:
      $("#fil_color").show();
      break;
  }

  if (actual_filter != 2) $("#fil_type").hide();
  if (actual_filter != 3) $("#fil_color").hide();
});

$("#fil_type").click(function (e) {
  if (actual_filter_type == types.length - 1) actual_filter_type = 0;
  else actual_filter_type++;

  $("#fil_type").html(types[actual_filter_type].name);

  filtrar_porTipo(types[actual_filter_type].id);

  render_cards();
});

$("#fil_color").click(async function (e) {
  if (actual_filter_color == color.length - 1) actual_filter_color = 0;
  else actual_filter_color++;

  $("#fil_color").html(color[actual_filter_color].name);

  await filtrar_porColor(color[actual_filter_color].id);

  render_cards();
});

$("#change_gen").click(async function (e) {
  if (actual_generation == 8) actual_generation = 1;
  else actual_generation++;

  $("#change_gen").html("GEN" + actual_generation);

  await filtrar_porGeneracion(actual_generation)

 
});

/* FILTROS */

async function filtrar_porGeneracion(gen)
{
  loading_on();
  await PC.listByGeneration(gen).done(async (resp) => {
    let especies_pokemon = resp.pokemon_species;
    loading_porcent(especies_pokemon, especies_pokemon.length);
    cardslist = await PS.ordenar_para_lista(
      especies_pokemon,
      especies_pokemon.length
    );
    cardslist_original = cardslist;
    loading_off();
    render_cards();
    console.log(cardslist, PS.list_data_pokemons);
  });
}

async function filtrar_porColor(color) {
  let list_pokemons = await PC.listByColour(color);

  cardslist = cardslist_original.filter((elem) => {
    let pokemon_data = list_pokemons.pokemon_species.find(
      (e) => e.name == elem.name
    );
    return pokemon_data != null;
  });
}

function filtrar_porTipo(tipo) {
  cardslist = cardslist_original.filter((elem) => {
    let pokemon_data = PS.list_data_pokemons.find((e) => e.name == elem.name);
    return (
      pokemon_data.types[0].type.name == tipo ||
      (pokemon_data.types[1] && pokemon_data.types[1].type.name == tipo)
    );
  });
}

/* RENDER FUNCTIONS */

function render_cards() {
  $("#poke_cards").html("");

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
