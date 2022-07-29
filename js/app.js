import { list_poke_colour, list_poke_gen, find_poke } from "./pokeapi/pokeapi.js"

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
    { id: "white", name: "Blanco" }
]

$(function () {
    var list = list_poke_gen("generation-i")

    list.done(resp => {
        let lista_pokemon = resp.pokemon_species
        console.log(lista_pokemon)
        lista_pokemon.sort((e1, e2) => {
            let id1 = e1.url.split("/")[6]
            let id2 = e2.url.split("/")[6]
            return id1 - id2
        })
        list_pokemons(lista_pokemon)
    })

    /*
        $("#poke_color").append(array_to_htmlOption(color));
    
        $("#poke_color").on("change", () => {
            $("#poke_info").html("")
            $("#poke_cards").html("")
    
            let color = $("#poke_color").val();
    
            console.log(color)
    
            list_poke_colour(color).done((resp) => {
                list_pokemons(resp.pokemon_species)
            })
    
        })
    
        list_poke_gen("").done((gens) => {
            let gens_maped = gens.results.map(elem => {
                return { id: elem.name, name: elem.name }
            })
            $("#poke_gen").append(array_to_htmlOption(gens_maped));
    
            $("#poke_gen").on("change", () => {
                $("#poke_info").html("")
                $("#poke_cards").html("")
    
                let gen = $("#poke_gen").val()
    
                list_poke_gen(gen).done(resp => {
                    list_pokemons(resp.pokemon_species)
                })
            })
        })
        */

})

async function inicializar() {
    var list = await list_poke_gen("generation-i")
    //list.done( resp => {
    //     list_pokemons(resp.pokemon_species)
    //})
}


function list_pokemons(list) {
    var cards = [] 
    list.forEach(async elem => {
        var poke = await find_poke(elem.name)
        elem.image = poke.sprites.front_default

        cards.push(elem)
        /*
        poke.done((poke) => {

            $("#poke_cards").append(
                `<div class="poke_card">             
                        <img class="poke_img" src="${poke.sprites.front_default}" alt="${elem.name}"/>
                        <span class="poke_infoname" >${elem.name}</span>
                    </div>`
            )

        })
            .fail(resp => {
                console.log("error :CC");
            })
            */
    })
    console.log(cards)
    cards.forEach( elem => {
       
        $("#poke_cards").append(
            `<div class="poke_card">             
                    <img class="poke_img" src="${elem.image}" alt="${elem.name}"/>
                    <span class="poke_infoname" >${elem.name}</span>
                </div>`
        )

    })
    $(".poke_card").click(() => {
        $("#poke_info").html("pika")
        $("#poke_info").slideDown()
    })
}


function array_to_htmlOption(array) {
    let options = ""
    array.forEach(function (elem) {
        options += `<option value="${elem.id}">${elem.name}</option>`
    })
    return options;
}

function poke_events() {
    let pokecards = $("#poke_cards").children()
    pokecards.forEach(elem => {
        elem.click(() => {

            console.log("click pokemon")
        });
    })
}


$("#navmenu").click(() => {
    $("#navmenu").toggleClass("active")
   // $("#poke_info").toggle()
})