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
    const formularioAñadir = document.getElementById("formularioAñadir");
    const btnCerrarFormulario = document.getElementById("btnCerrarFormulario");
    const btnCancelar = document.getElementById("btnCancelar");
    const formAñadirHabitat = document.getElementById("formAñadirHabitat");
    
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

    // Mostrar/ocultar formulario al hacer clic en Añadir
    btnAñadir.addEventListener("click", () => {
        formularioAñadir.classList.remove("hidden");
    });

    function cerrarFormulario() {
        formularioAñadir.classList.add("hidden");
    }

    btnCerrarFormulario.addEventListener("click", cerrarFormulario);
    btnCancelar.addEventListener("click", cerrarFormulario);

    // Añadir hábitat del formulario con POST
    formAñadirHabitat.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nuevoHabitat = {
            nombre: document.getElementById("nombre").value,
            clima: document.getElementById("clima").value,
            imagen_url: document.getElementById("imagen_url").value,
            descripcion: document.getElementById("descripcion").value
        };

        try {
            const response = await fetch('http://localhost:8080/habitats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoHabitat)
            });

            if (response.ok) {
                const respuestaHabitats = await fetch('http://localhost:8080/habitats');
                const dataActualizados = await respuestaHabitats.json();
                
                dataHabitats.length = 0;
                dataHabitats.push(...dataActualizados);
                
                cerrarFormulario();
                formAñadirHabitat.reset();
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Hábitat añadido correctamente',
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al añadir el hábitat. Intenta de nuevo.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Verifica que el servidor esté activo.'
            });
        }
    });

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
