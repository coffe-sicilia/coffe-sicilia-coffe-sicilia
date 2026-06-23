/* ==========================================================================
   CAFÉ SICILIA — script.js
   CORRECCIONES APLICADAS:
   - Bug crítico: DOMContentLoaded estaba duplicado. Toda la lógica de tabs y
     acordeón se registraba dos veces, causando disparos de eventos dobles.
   - Se unifica en un único listener con responsabilidades claras y separadas.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --- Selectores cacheados (una sola consulta al DOM) --- */
    const botones         = document.querySelectorAll(".tab-btn");
    const contenidos      = document.querySelectorAll(".categoria-content");
    const todosLosDetails = document.querySelectorAll(".tarjeta-platillo");
    const themeBotones    = document.querySelectorAll(".theme-btn");

    /* =========================================================
       1. INTERRUPTOR DE TEMAS
       ========================================================= */
    themeBotones.forEach(btn => {
        btn.addEventListener("click", () => {
            themeBotones.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");

            const theme = btn.getAttribute("data-theme");

            /* "original" limpia el atributo; cualquier otro lo establece */
            if (theme === "original") {
                document.body.removeAttribute("data-theme");
            } else {
                document.body.setAttribute("data-theme", theme);
            }
        });
    });

    /* =========================================================
       2. ANIMACIÓN DE ENTRADA EN CASCADA (STAGGER)
       El mini-timeout de 25ms fuerza un reflow para que la
       transición CSS se pueda disparar desde cero.
       ========================================================= */
    function dispararAnimacionSubida(contenedorActivo) {
        const tarjetas = contenedorActivo.querySelectorAll(".tarjeta-platillo");

        /* Limpiamos primero para poder reanimar */
        tarjetas.forEach(t => t.classList.remove("animar-subida"));

        setTimeout(() => {
            tarjetas.forEach(t => t.classList.add("animar-subida"));
        }, 25);
    }

    /* Animamos la pestaña visible desde el primer render */
    const pestañaInicial = document.querySelector(".categoria-content.activo");
    if (pestañaInicial) {
        dispararAnimacionSubida(pestañaInicial);
    }

    /* =========================================================
       3. LÓGICA DE PESTAÑAS (TABS)
       ========================================================= */
    botones.forEach(boton => {
        boton.addEventListener("click", () => {

            /* Limpiar estado activo de botones y contenidos */
            botones.forEach(b => b.classList.remove("activo"));
            contenidos.forEach(c => {
                c.classList.remove("activo");
                /* Resetear tarjetas ocultas para que re-animen al volver */
                c.querySelectorAll(".tarjeta-platillo").forEach(t => t.classList.remove("animar-subida"));
            });

            boton.classList.add("activo");

            const targetId        = boton.getAttribute("data-target");
            const contenedorActivo = document.getElementById(targetId);

            contenedorActivo.classList.add("activo");
            dispararAnimacionSubida(contenedorActivo);
            cerrarTodosLosAcordeones();
        });
    });

    /* =========================================================
       4. ACORDEÓN EXCLUSIVO (sólo uno abierto a la vez)
       ========================================================= */
    todosLosDetails.forEach(details => {
        details.addEventListener("toggle", () => {
            if (details.open) {
                todosLosDetails.forEach(otro => {
                    if (otro !== details && otro.open) {
                        otro.open = false;
                    }
                });
            }
        });
    });

    function cerrarTodosLosAcordeones() {
        todosLosDetails.forEach(d => (d.open = false));
    }

}); /* — Fin del único DOMContentLoaded — */