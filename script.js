document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".tab-btn");
    const contenidos = document.querySelectorAll(".categoria-content");
    const todosLosDetails = document.querySelectorAll(".tarjeta-platillo");

    // Función encargada de activar la animación de subida en cadena
    function dispararAnimacionSubida(contenedorActivo) {
        const tarjetas = contenedorActivo.querySelectorAll(".tarjeta-platillo");
        
        // Primero nos aseguramos de limpiar la clase para reiniciar el estado
        tarjetas.forEach(t => t.classList.remove("animar-subida"));
        
        // Usamos un mini-timeout para que el navegador capte el reinicio y aplique el retraso CSS
        setTimeout(() => {
            tarjetas.forEach(t => t.classList.add("animar-subida"));
        }, 20);
    }

    // Disparar la animación al cargar la página por primera vez para la pestaña activa por defecto
    const pestañaInicial = document.querySelector(".categoria-content.activo");
    if (pestañaInicial) {
        dispararAnimacionSubida(pestañaInicial);
    }

    // === LÓGICA DE PESTAÑAS (TABS) ===
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("activo"));
            contenidos.forEach(c => {
                c.classList.remove("activo");
                // Reseteamos las tarjetas de las pestañas ocultas
                c.querySelectorAll(".tarjeta-platillo").forEach(t => t.classList.remove("animar-subida"));
            });

            boton.classList.add("activo");
            const targetId = boton.getAttribute("data-target");
            const contenedorActivo = document.getElementById(targetId);
            
            contenedorActivo.classList.add("activo");
            
            // Ejecutamos el efecto de cascada en la nueva pestaña visible
            dispararAnimacionSubida(contenedorActivo);
            cerrarTodosLosAcordeones();
        });
    });

    // === LÓGICA DE ACORDEÓN EXCLUSIVO ===
    todosLosDetails.forEach(details => {
        details.addEventListener("toggle", () => {
            if (details.open) {
                todosLosDetails.forEach(otroDetails => {
                    if (otroDetails !== details && otroDetails.open) {
                        otroDetails.open = false;
                    }
                });
            }
        });
    });

    function cerrarTodosLosAcordeones() {
        todosLosDetails.forEach(d => d.open = false);
    }
});