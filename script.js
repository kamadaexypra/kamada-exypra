
// =========================
// MODO CLARO / OSCURO
// =========================

const botonTema = document.getElementById("boton-tema");

if (botonTema) {
    botonTema.addEventListener("click", function () {
        document.body.classList.toggle("modo-claro");
    });
}

// =========================
// GUARDAR MODO CLARO / OSCURO
// =========================

// Recuperar el tema guardado
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "claro") {
    document.body.classList.add("modo-claro");
    document.body.classList.remove("modo-oscuro");
} else {
    document.body.classList.add("modo-oscuro");
    document.body.classList.remove("modo-claro");
}


// MODO OSCURO
function modoOscuro() {

    document.body.classList.remove("modo-claro");
    document.body.classList.add("modo-oscuro");

    localStorage.setItem("tema", "oscuro");
}


// MODO CLARO
function modoClaro() {

    document.body.classList.remove("modo-oscuro");
    document.body.classList.add("modo-claro");

    localStorage.setItem("tema", "claro");
}


// =========================
// MENÚ KAMADA;EXYPRA
// =========================

function abrirMenu() {

    const menu = document.getElementById("menuKamada");

    if (menu) {
        menu.classList.toggle("mostrar");
    }
}


// =========================
// TEXTO DE LA NOVELA
// =========================

document.querySelectorAll(".texto-novela").forEach(contenedor => {

    const texto = contenedor.textContent.trim();

    const parrafos = texto.split(/\n\s*\n/);

    contenedor.innerHTML = parrafos
        .map(parrafo => `<p>${parrafo.trim()}</p>`)
        .join("");

});


// =========================
// REPRODUCTOR DE MÚSICA
// =========================

function reproducirCancion() {

    const audio = document.getElementById("interlude");
    const icono = document.getElementById("iconoPlay");

    if (!audio || !icono) {
        return;
    }

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


// Cambiar el icono cuando termine la canción

const audioInterlude = document.getElementById("interlude");
const iconoInterlude = document.getElementById("iconoPlay");

if (audioInterlude && iconoInterlude) {

    audioInterlude.addEventListener("ended", function () {
        iconoInterlude.textContent = "▶";
    });

}
