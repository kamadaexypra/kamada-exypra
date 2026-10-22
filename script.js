
/* =========================================
   KAMADA;EXYPRA — SCRIPT PRINCIPAL
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MODO CLARO / OSCURO
    // =====================================

    const botonTema = document.getElementById("boton-tema");

    function aplicarTema(tema) {
        document.body.classList.remove(
            "modo-claro",
            "modo-oscuro"
        );

        document.body.classList.add(
            tema === "claro" ? "modo-claro" : "modo-oscuro"
        );

        localStorage.setItem("tema", tema);
    }

    // Recuperar tema guardado
    const temaGuardado = localStorage.getItem("tema");

    aplicarTema(
        temaGuardado === "claro" ? "claro" : "oscuro"
    );

    // Botón para alternar tema
    if (botonTema) {
        botonTema.addEventListener("click", function () {

            const esClaro = document.body.classList.contains(
                "modo-claro"
            );

            aplicarTema(esClaro ? "oscuro" : "claro");
        });
    }


    // =====================================
    // MENÚS DESPLEGABLES
    // =====================================

    document.querySelectorAll(".dropdown").forEach(
        function (dropdown) {

            const boton = dropdown.querySelector(
                ".dropdown-boton"
            );

            if (!boton) return;

            boton.setAttribute("aria-expanded", "false");

            boton.addEventListener("click", function (event) {
                event.stopPropagation();

                const abierto = dropdown.classList.contains(
                    "abierto"
                );

                // Cerrar los demás menús
                document.querySelectorAll(".dropdown").forEach(
                    function (otroMenu) {
                        otroMenu.classList.remove("abierto");

                        const otroBoton = otroMenu.querySelector(
                            ".dropdown-boton"
                        );

                        if (otroBoton) {
                            otroBoton.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }
                    }
                );

                if (!abierto) {
                    dropdown.classList.add("abierto");
                    boton.setAttribute(
                        "aria-expanded",
                        "true"
                    );
                }
            });
        }
    );

    // Cerrar menús al pulsar fuera
    document.addEventListener("click", function (event) {

        if (!event.target.closest(".dropdown")) {

            document.querySelectorAll(".dropdown").forEach(
                function (dropdown) {

                    dropdown.classList.remove("abierto");

                    const boton = dropdown.querySelector(
                        ".dropdown-boton"
                    );

                    if (boton) {
                        boton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                }
            );
        }
    });

    // Cerrar menús con Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            document.querySelectorAll(".dropdown").forEach(
                function (dropdown) {

                    dropdown.classList.remove("abierto");

                    const boton = dropdown.querySelector(
                        ".dropdown-boton"
                    );

                    if (boton) {
                        boton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }
                }
            );
        }
    });


    // =====================================
    // TEXTO DE LA NOVELA
    // =====================================

    document.querySelectorAll(".texto-novela").forEach(
        function (contenedor) {

            // Evitar procesar dos veces
            if (contenedor.dataset.formateado === "true") {
                return;
            }

            // Conservar las etiquetas HTML originales
            const htmlOriginal = contenedor.innerHTML.trim();

            // Dividir por líneas en blanco,
            // sin borrar <strong>, <em>, <span>, etc.
            const parrafos = htmlOriginal.split(
                /\r?\n\s*\r?\n/
            );

            contenedor.innerHTML = parrafos
                .filter(function (parrafo) {
                    return parrafo.trim() !== "";
                })
                .map(function (parrafo) {

                    const contenido = parrafo.trim();

                    // Conservar bloques HTML existentes
                    if (/^<(p|div|h[1-6]|blockquote|ul|ol|section)\b/i.test(contenido)) {
                        return contenido;
                    }

                    return "<p>" + contenido + "</p>";
                })
                .join("\n");

            contenedor.dataset.formateado = "true";
        }
    );


    // =====================================
    // REPRODUCTOR DE MÚSICA
    // INTERLUDE + DANCE & SCREAM
    // =====================================

    const botonesMusica = document.querySelectorAll(
        ".boton-portada[data-audio]"
    );

    botonesMusica.forEach(function (boton) {

        const audioId = boton.dataset.audio;

        const audio = document.getElementById(audioId);

        const icono = boton.querySelector(".icono-play");

        if (!audio || !icono) {
            return;
        }

        function actualizarIcono() {

            const reproduciendo = !audio.paused;

            icono.textContent = reproduciendo
                ? "❚❚"
                : "▶";

            boton.setAttribute(
                "aria-pressed",
                String(reproduciendo)
            );

            boton.setAttribute(
                "aria-label",
                (reproduciendo ? "Pausar " : "Reproducir ") +
                audioId
            );
        }

        boton.addEventListener("click", async function () {

            if (audio.paused) {

                // Pausar otras canciones
                document.querySelectorAll("audio").forEach(
                    function (otroAudio) {

                        if (otroAudio !== audio) {
                            otroAudio.pause();
                        }
                    }
                );

                try {
                    await audio.play();
                } catch (error) {

                    console.error(
                        "Error al reproducir audio:",
                        error
                    );

                    alert(
                        "No se pudo reproducir la canción. Comprueba el enlace del MP3."
                    );
                }

            } else {

                audio.pause();
            }

            actualizarIcono();
        });

        audio.addEventListener(
            "play",
            actualizarIcono
        );

        audio.addEventListener(
            "pause",
            actualizarIcono
        );

        audio.addEventListener(
            "ended",
            actualizarIcono
        );

        audio.addEventListener("error", function () {

            console.error(
                "No se pudo cargar el audio:",
                audioId
            );

            actualizarIcono();
        });

        actualizarIcono();
    });

});


// =========================================
// FUNCIONES GLOBALES
// Compatibilidad con botones onclick
// =========================================

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


// MENÚ KAMADA;EXYPRA
function abrirMenu() {

    const menu = document.getElementById("menuKamada");

    if (menu) {
        menu.classList.toggle("mostrar");
    }
}


// =========================================
// FIN — KAMADA;EXYPRA
// =========================================
// GOOGLE ANALYTICS Y CONSENTIMIENTO

(function () {
    const GA_ID = "G-QLRTW427SC";
    const STORAGE_KEY = "kamada_analytics_consent";

    function iniciarAnalytics() {
        if (document.getElementById("google-analytics-script")) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        window.gtag("config", GA_ID);

        const script = document.createElement("script");
        script.id = "google-analytics-script";
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;

        document.head.appendChild(script);
    }

    function iniciarConsentimiento() {
        const consentimiento = localStorage.getItem(STORAGE_KEY);

        if (consentimiento === "aceptado") {
            iniciarAnalytics();
            return;
        }

        if (consentimiento === "rechazado") return;

        const aviso = document.createElement("div");
        aviso.id = "aviso-cookies";

        aviso.innerHTML = `
            <p>
                KAMADA;EXYPRA utiliza cookies analíticas opcionales
                para conocer las visitas a la web.
            </p>
            <button id="aceptar-analytics">Aceptar</button>
            <button id="rechazar-analytics">Rechazar</button>
        `;

        document.body.appendChild(aviso);

        document.getElementById("aceptar-analytics").onclick = function () {
            localStorage.setItem(STORAGE_KEY, "aceptado");
            aviso.remove();
            iniciarAnalytics();
        };

        document.getElementById("rechazar-analytics").onclick = function () {
            localStorage.setItem(STORAGE_KEY, "rechazado");
            aviso.remove();
        };
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarConsentimiento);
    } else {
        iniciarConsentimiento();
    }
})();
function cambiarCookies() {
    localStorage.removeItem("kamada_analytics_consent");
    window.location.reload();
}
// =====================================
// KAMADA;EXYPRA — FINAL DEL PRÓLOGO
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const esPrologo = window.location.pathname ===
        "/kamadaexypra/webnovel.html";

    if (!esPrologo) return;

    const textoNovela = document.querySelector(".texto-novela");

    if (!textoNovela) return;

    let finalRegistrado = false;

    const observador = new IntersectionObserver(function (entradas) {

        entradas.forEach(function (entrada) {

            if (!entrada.isIntersecting || finalRegistrado) return;

            finalRegistrado = true;

            // Solo registrar si el lector aceptó Analytics
            if (
                localStorage.getItem("kamada_analytics_consent") === "aceptado" &&
                typeof window.gtag === "function"
            ) {
                window.gtag("event", "final_prologo", {
                    capitulo: "prologo",
                    novela: "KAMADA;EXYPRA"
                });
            }

            observador.disconnect();

        });

    }, {
        threshold: 0.5
    });

    // Observar el último párrafo del prólogo
    const parrafos = textoNovela.querySelectorAll("p");

    if (parrafos.length > 0) {
        observador.observe(parrafos[parrafos.length - 1]);
    }

});
