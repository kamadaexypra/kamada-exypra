
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

/* =========================================
   KAMADA;EXYPRA — COOKIES Y ANALYTICS
========================================= */

(function () {
    const GA_ID = "G-QLRTW427SC";
    const STORAGE_KEY = "kamada_analytics_consent";

    function obtenerConsentimiento() {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    function guardarConsentimiento(valor) {
        try {
            localStorage.setItem(STORAGE_KEY, valor);
        } catch (error) {
            console.warn("No se pudo guardar el consentimiento", error);
        }
    }

    function eliminarCookiesAnalytics() {
        const nombres = document.cookie
            .split(";")
            .map(cookie => cookie.trim().split("=")[0])
            .filter(nombre =>
                nombre === "_ga" ||
                nombre.startsWith("_ga_") ||
                nombre === "_gid" ||
                nombre.startsWith("_gat")
            );

        const partes = location.hostname.split(".");
        const dominios = [""];

        for (let i = 0; i < partes.length - 1; i++) {
            dominios.push(partes.slice(i).join("."));
        }

        nombres.forEach(nombre => {
            dominios.forEach(dominio => {
                document.cookie =
                    nombre + "=; Max-Age=0; path=/" +
                    (dominio ? "; domain=" + dominio : "");
            });
        });
    }

    function desactivarAnalytics() {
        window["ga-disable-" + GA_ID] = true;
        eliminarCookiesAnalytics();
    }

    function activarAnalytics() {
        if (obtenerConsentimiento() !== "aceptado") return;

        window["ga-disable-" + GA_ID] = false;

        if (document.getElementById("google-analytics-script")) {
            return;
        }

        window.dataLayer = window.dataLayer || [];

        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag("js", new Date());
        window.gtag("config", GA_ID);

        const script = document.createElement("script");
        script.id = "google-analytics-script";
        script.async = true;
        script.src =
            "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;

        document.head.appendChild(script);
    }

    function mostrarAvisoCookies() {
        document.getElementById("aviso-cookies")?.remove();

        const aviso = document.createElement("div");
        aviso.id = "aviso-cookies";
        aviso.setAttribute("role", "dialog");
        aviso.setAttribute("aria-label", "Preferencias de cookies");

        aviso.innerHTML = `
            <p>
                KAMADA;EXYPRA utiliza cookies analíticas
                opcionales de Google Analytics para conocer
                las visitas a la web.
                <a href="/legal/cookies.html">Más información</a>
            </p>
            <button type="button" id="aceptar-analytics">
                Aceptar
            </button>
            <button type="button" id="rechazar-analytics">
                Rechazar
            </button>
        `;

        document.body.appendChild(aviso);

        document.getElementById("aceptar-analytics")
            .addEventListener("click", function () {
                guardarConsentimiento("aceptado");
                aviso.remove();
                activarAnalytics();
            });

        document.getElementById("rechazar-analytics")
            .addEventListener("click", function () {
                guardarConsentimiento("rechazado");
                desactivarAnalytics();
                aviso.remove();

                // Detener también el script ya cargado
                window.location.reload();
            });
    }

    // Permite cambiar la decisión desde el footer
    window.cambiarCookies = function () {
        mostrarAvisoCookies();
    };

    function observarFinalPrologo() {
        if (
            window.location.pathname !==
            "/kamadaexypra/webnovel.html"
        ) return;

        const texto = document.querySelector(".texto-novela");
        if (!texto) return;

        const parrafos = texto.querySelectorAll("p");
        const ultimo = parrafos[parrafos.length - 1];

        if (!ultimo) return;

        let registrado = false;

        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (!entrada.isIntersecting || registrado) return;

                registrado = true;

                if (
                    obtenerConsentimiento() === "aceptado" &&
                    !window["ga-disable-" + GA_ID] &&
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

        observador.observe(ultimo);
    }

    function iniciar() {
        const consentimiento = obtenerConsentimiento();

        if (consentimiento === "aceptado") {
            activarAnalytics();
        } else {
            desactivarAnalytics();

            if (consentimiento !== "rechazado") {
                mostrarAvisoCookies();
            }
        }

        observarFinalPrologo();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();

/* ENLACE GLOBAL PARA CONFIGURAR COOKIES */
document.addEventListener("DOMContentLoaded", function () {
    const pies = document.querySelectorAll(
        ".footer-legal, .cinema-footer, .footer-principal"
    );

    pies.forEach(function (pie) {
        if (pie.querySelector(".enlace-configurar-cookies")) {
            return;
        }

        const enlaceExistente = Array.from(
            pie.querySelectorAll("a")
        ).find(a => a.textContent.trim() === "Configurar cookies");

        if (enlaceExistente) {
            return;
        }

        const enlace = document.createElement("a");
        enlace.href = "#";
        enlace.className = "enlace-configurar-cookies";
        enlace.textContent = "Configurar cookies";

        enlace.addEventListener("click", function (evento) {
            evento.preventDefault();

            if (typeof window.cambiarCookies === "function") {
                window.cambiarCookies();
            }
        });

        const contenedor = pie.querySelector(".footer-legal")
            || pie.querySelector("div")
            || pie;

        contenedor.append(" · ", enlace);
    });
});
