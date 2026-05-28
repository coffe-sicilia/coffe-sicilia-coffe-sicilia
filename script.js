document.addEventListener("DOMContentLoaded", () => {
    // === LÓGICA DE PESTAÑAS (TABS) ===
    const botones = document.querySelectorAll(".tab-btn");
    const contenidos = document.querySelectorAll(".categoria-content");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("activo"));
            contenidos.forEach(c => c.classList.remove("activo"));

            boton.classList.add("activo");
            const targetId = boton.getAttribute("data-target");
            document.getElementById(targetId).classList.add("activo");

            // Opcional: Al cambiar de pestaña, cierra cualquier acordeón interno que haya quedado abierto
            cerrarTodosLosAcordeones();
        });
    });

    // === LÓGICA DE ACORDEÓN EXCLUSIVO (SÓLO UNO ABIERTO) ===
    const todosLosDetails = document.querySelectorAll(".tarjeta-platillo");

    todosLosDetails.forEach(details => {
        // Escuchamos el evento nativo 'toggle' de la etiqueta <details>
        details.addEventListener("toggle", (e) => {
            // El evento toggle se dispara tanto al abrir como al cerrar. 
            // Solo nos interesa actuar cuando el usuario está ABRIENDO un elemento.
            if (details.open) {
                // Buscamos a los hermanos dentro de la misma lista activa y los cerramos
                todosLosDetails.forEach(otroDetails => {
                    if (otroDetails !== details && otroDetails.open) {
                        otroDetails.open = false; // Cierra el menú automáticamente
                    }
                });
            }
        });
    });

    function cerrarTodosLosAcordeones() {
        todosLosDetails.forEach(d => d.open = false);
    }
});