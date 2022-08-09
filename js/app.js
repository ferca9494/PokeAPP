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

var cardslist = []

$(function () {
    var list = list_poke_gen("generation-i")

    list.done(async resp => {
        let especies_pokemon = resp.pokemon_species      
        await get_list_pokemons(especies_pokemon)
        render_cards()
        loading()
    })

    $(".poke_card").click(() => {
        $("#poke_info").html("pika")
        $("#poke_info").slideDown()
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


async function get_list_pokemons(list) {

    list.sort((e1, e2) => {
        let id1 = e1.url.split("/")[6]
        let id2 = e2.url.split("/")[6]
    
        return id1 - id2
    })


    for(let i = 0; i < list.length ; i++)
    {
        var elem = list[i]
        var poke = await find_poke(list[i].name)
        elem.image = poke.sprites.front_default

        cardslist.push(
            {
                id: elem.url.split("/")[6],
                name: elem.name,
                img: poke.sprites.front_default
            }
        )

        console.log("push!")
    }
    /*
    list.forEach(async elem => {
        var poke = await find_poke(elem.name)
        elem.image = poke.sprites.front_default

        cardslist.push(
            {
                id: elem.url.split("/")[6],
                name: elem.name,
                img: poke.sprites.front_default
            }
        )

        console.log("push!")
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
    //})

}
function render_cards() {
    console.log(cardslist)
    cardslist.forEach(elem => {

        $("#poke_cards").append(
            `<div class="poke_card">             
                <img class="poke_img" src="${elem.img}" alt="${elem.name}"/>
                <span class="poke_infoname" >${elem.name}</span>
             </div>`
        )

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

function loading()
{
    $(".loading").toggle()
}

$("#navmenu").click(() => {
    $("#navmenu").toggleClass("active")
    $("#poke_info").toggle()
})