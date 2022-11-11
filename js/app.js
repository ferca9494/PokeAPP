/* MENU FUNCTIONS */
var menu_opened = false;

function toggle_menu() {
  $("#navmenu").toggleClass("active");
  if (!menu_opened) open_menu();
  else close_menu();
}

function open_menu() {
  menu_opened = true;
  $("#menu").css("visibility", "visible");
}

function close_menu() {
  menu_opened = false;
  $("#menu").css("visibility", "hidden");
}

/* MODAL FUNCTIONS */

function close_modal() {
  $("#modal_container").hide();
}

/* LOADING FUNCTIONS */

function loading() {
  $(".wrap").toggle();
  $(".loading").toggle();
}

function loading_porcent(data, max) {
  let interval = setInterval(() => {
    let calc = (data.length / max) * 100;
    $(".load_percent").html(calc.toFixed(2) + "%");
    if (data.length == max) clearInterval(interval);
  }, 50);
}
