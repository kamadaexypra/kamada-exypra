const botonTema = document.getElementById("boton-tema");

botonTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-claro");
});
function abrirMenu() {

    const menu = document.getElementById("menuKamada");

    menu.classList.toggle("mostrar");
function modoOscuro() {
    document.body.classList.remove("modo-claro");
    document.body.classList.add("modo-oscuro");
}

function modoClaro() {
    document.body.classList.remove("modo-oscuro");
    document.body.classList.add("modo-claro");
}
}
