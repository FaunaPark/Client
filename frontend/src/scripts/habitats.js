//Espera a que se cargue todo el HTML antes de ejecutar el código
document.addEventListener('DOMContentLoaded', async () => {

    console.log("¡JS de hábitats conectado correctamente!");

    //Traer datos de la API de hábitats y animales
    const urlHabitats = 'http://localhost:8080/habitats';
    const resultHabitats = await fetch(urlHabitats)
    const dataHabitats = await resultHabitats.json();

    const urlAnimales = 'http://localhost:8080/animales';
    const resultAnimales = await fetch(urlAnimales)
    const dataAnimales = await resultAnimales.json();

    const inicio = document.getElementById("logo");
    const habitatList = document.getElementById("habitatList");
    const loadingSpinner = document.getElementById("loadingSpinner");
    
    // Elementos del formulario para AÑADIR hábitat
    const btnAñadir = document.getElementById("btnAñadir");
    
    // Elementos del formulario para EDITAR hábitat
    const btnEditar = document.getElementById("btnEditar");
    const bannerEdicion = document.getElementById("bannerEdicion");
    const btnCancelarModoEdicion = document.getElementById("btnCancelarModoEdicion");
    
    // Elementos para el modo ELIMINAR
    const btnEliminar = document.getElementById("btnEliminar");
    const bannerEliminacion = document.getElementById("bannerEliminacion");
    const btnCancelarModoEliminacion = document.getElementById("btnCancelarModoEliminacion");
    
    let modoEdicionActivo = false;
    let modoEliminacionActivo = false;
    
    inicio.addEventListener("click", () => {
        window.location.href = "./index.html";
    });

    // Funciones para controlar el spinner de carga
    function mostrarLoading() {
        loadingSpinner.classList.remove("hidden");
        habitatList.classList.add("hidden");
    }

    function ocultarLoading() {
        loadingSpinner.classList.add("hidden");
        habitatList.classList.remove("hidden");
    }

    // Activar/desactivar modo edición
    btnEditar.addEventListener("click", () => {
        modoEdicionActivo = true;
        bannerEdicion.classList.remove("hidden");
        document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
            card.classList.add('modo-edicion');
        });
    });

    btnCancelarModoEdicion.addEventListener("click", () => {
        modoEdicionActivo = false;
        bannerEdicion.classList.add("hidden");
        document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
            card.classList.remove('modo-edicion');
        });
    });

    // Activar/desactivar modo eliminación
    btnEliminar.addEventListener("click", () => {
        modoEliminacionActivo = true;
        bannerEliminacion.classList.remove("hidden");
        document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
            card.classList.add('modo-eliminacion');
        });
    });

    btnCancelarModoEliminacion.addEventListener("click", () => {
        modoEliminacionActivo = false;
        bannerEliminacion.classList.add("hidden");
        document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
            card.classList.remove('modo-eliminacion');
        });
    });

    // Mostrar spinner inicialmente
    mostrarLoading();
    setTimeout(() => {
        ocultarLoading();
    }, 500);
});
