import {
  list_poke_colour,
  list_poke_gen,
  find_poke,
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

var list_data_pokemons = [];
var cardslist = [];

/* EVENTOS */

$(function () {
  var list = list_poke_gen("generation-i");

  list.done(async (resp) => {
    let especies_pokemon = resp.pokemon_species;
    cardslist = await get_list_pokemons(especies_pokemon);

    render_cards();
    loading();

    $("div.poke_card").click((e) => {
      let attr = e.currentTarget.attributes;
      let id = attr.pokemonID.value;
      let name = attr.pokemonNAME.value;

      //speak("Pokemon numero " + id + " " + name);

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

$("#modal_close_btn").click(()=>{
    $("#modal_container").hide();
})

/* FUNCTIONS */

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
  let pokemon_data = list_data_pokemons.find((e) => (e.id == id));

  $("#modal_title").html(`#${id} ${name}`);
  $("#modal_img").html(`
        <img src="${pokemon_data.sprites.other["official-artwork"].front_default}"/>
        `);
        $("#modal_info").html(`
        <p>sarasaaaaaaaaaaaaaaaaaaaaaa</p>
        `);
  $("#modal_container").show();
}

function loading() {
  $(".loading").toggle();
}
