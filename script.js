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
}document.querySelectorAll(".texto-novela").forEach(contenedor => {

    const texto = contenedor.textContent.trim();

    const parrafos = texto.split(/\n\s*\n/);

    contenedor.innerHTML = parrafos
        .map(parrafo => `<p>${parrafo.trim()}</p>`)
        .join("");

});
}
function reproducirCancion() {

    <script>

const audio = document.getElementById("interlude");
const icono = document.getElementById("iconoPlay");

function reproducirCancion() {

    if (audio.paused) {

        audio.play()
            .then(() => {
                icono.textContent = "❚❚";
            })
            .catch(error => {
                console.log("Error reproduciendo audio:", error);
            });

    } else {

        audio.pause();
        icono.textContent = "▶";

    }

}

audio.addEventListener("ended", function () {
    icono.textContent = "▶";
});

</script>

    }

}
