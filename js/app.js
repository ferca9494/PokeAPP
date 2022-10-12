import {
  list_poke_colour,
  list_poke_gen,
  find_poke,
  find_poke_species,
} from "./pokeapi/pokeapi.js";

/* GLOBAL VARS */

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
var list_data_pokemons = [];
var selected_pokemon_data = {};
var cardslist = [];

/* EVENTOS */

$(function () {
  var list = list_poke_gen("generation-i");

  list.done(async (resp) => {
    let especies_pokemon = resp.pokemon_species;
    cardslist = await get_list_pokemons(especies_pokemon);

    render_cards();
    loading();

    $("div.poke_card").click(async (e) => {
      let attr = e.currentTarget.attributes;
      let id = attr.pokemonID.value;
      let name = attr.pokemonNAME.value;

      selected_pokemon_data = await find_poke_species(name);
      // speak("Pokemon numero " + id + " " + name);
      // speak(selected_pokemon_data.flavor_text_entries[0].flavor_text);

      console.log(selected_pokemon_data);

      render_info(id, name);
    });

    console.log(cardslist);
    console.log(list_data_pokemons);
  });
});

$("#navmenu").click(() => {
  $("#navmenu").toggleClass("active");
  $("#poke_info").toggle();
});

$("#modal_close_btn").click(() => {
  $("#modal_container").hide();
});

/* SERVICE FUNCTIONS */

async function get_list_pokemons(list) {
  list.sort((e1, e2) => {
    let id1 = e1.url.split("/")[6];

    let id2 = e2.url.split("/")[6];

    return id1 - id2;
  });

  let max = 10; //list.length
  let elements = [];

  for (let i = 0; i < max; i++) {
    var elem = list[i];
    var poke = await find_poke(list[i].name);

    list_data_pokemons.push(poke);

    //elem.image = poke.sprites.other["official-artwork"].front_default;
    elem.image = poke.sprites.front_default;

    elements.push({
      id: elem.url.split("/")[6],
      name: elem.name,
      img: elem.image,
    });

    console.log("push!");
  }

  return elements;
}

/* RENDER FUNCTIONS */

function render_cards() {
  cardslist.forEach((elem) => {
    $("#poke_cards").append(
      `<div class="poke_card" 
        pokemonID="${elem.id}" 
        pokemonNAME="${elem.name}"
      >             
            <img class="poke_img" src="${elem.img}" alt="${elem.name}"/>
            <span class="poke_infoname" >${elem.name}</span>
        </div>`
    );
  });
}

function render_info(id, name) {
  let pokemon_data = list_data_pokemons.find((e) => e.id == id);
  let tipo1 = types.find((elem)=>elem.id == pokemon_data.types[0].type.name)
  let tipo1_html = "<span class='tipo' style='background:"+tipo1.color+"'>"+tipo1.name+"</span>"
  let tipo2 , tipo2_html="" 
  if(pokemon_data.types[1])
  {
  tipo2 = types.find((elem)=>elem.id == pokemon_data.types[1].type.name)
  tipo2_html = "<span class='tipo' style='background:"+tipo2.color+"'>"+tipo2.name+"</span>"
  }


  $("#modal_num").html("#" + id);
  $("#modal_title").html(name);
  $("#modal_img").html(
    `<img src="${pokemon_data.sprites.other["official-artwork"].front_default}"/>`
  );

  $("#modal_info").html(`
        <ul>
          <li>Tipo: ${tipo1_html} ${tipo2_html}</li>
          <li>Peso: ${pokemon_data.weight}KGs</li>
          <li>Altura: ${pokemon_data.height}m</li>
        </ul>
        <p>
        ${selected_pokemon_data.flavor_text_entries[0].flavor_text}
        </p>
        `);
  $("#modal_container").show();
}

/* NAV CONTROL FUNCTIONS */

function loading() {
  $(".wrap").toggle();
  $(".loading").toggle();
}
