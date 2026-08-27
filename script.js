const botonTema = document.getElementById("boton-tema");

botonTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-claro");
});
function abrirMenu() {

    const menu = document.getElementById("menuKamada");

    menu.classList.toggle("mostrar");

}
