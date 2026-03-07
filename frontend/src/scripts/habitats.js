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
    const formularioEditar = document.getElementById("formularioEditar");
    const btnCerrarFormularioEditar = document.getElementById("btnCerrarFormularioEditar");
    const btnCancelarEditar = document.getElementById("btnCancelarEditar");
    const formEditarHabitat = document.getElementById("formEditarHabitat");
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
                
                mostrarHabitats(dataHabitats);
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

    // Función que carga los datos de un hábitat en el formulario de edición
    function cargarDatosHabitatEditar(habitat) {
        document.getElementById("editar_id").value = habitat.id;
        document.getElementById("editar_nombre").value = habitat.nombre;
        document.getElementById("editar_clima").value = habitat.clima;
        document.getElementById("editar_imagen_url").value = habitat.imagen_url;
        document.getElementById("editar_descripcion").value = habitat.descripcion;
    }

    // Función para cerrar/ocultar el formulario de editar
    function cerrarFormularioEditar() {
        formularioEditar.classList.add("hidden");
    }

    btnCerrarFormularioEditar.addEventListener("click", cerrarFormularioEditar);
    btnCancelarEditar.addEventListener("click", cerrarFormularioEditar);

    formEditarHabitat.addEventListener("submit", async (e) => {
        e.preventDefault();

        const habitatId = document.getElementById("editar_id").value;

        const habitatActualizado = {
            nombre: document.getElementById("editar_nombre").value,
            clima: document.getElementById("editar_clima").value,
            imagen_url: document.getElementById("editar_imagen_url").value,
            descripcion: document.getElementById("editar_descripcion").value
        };

        try {
            const response = await fetch(`http://localhost:8080/habitats/${habitatId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(habitatActualizado)
            });

            if (response.ok) {
                const respuestaHabitats = await fetch('http://localhost:8080/habitats');
                const dataActualizados = await respuestaHabitats.json();
                
                dataHabitats.length = 0;
                dataHabitats.push(...dataActualizados);
                
                mostrarHabitats(dataHabitats);
                cerrarFormularioEditar();
                
                modoEdicionActivo = false;
                bannerEdicion.classList.add("hidden");
                document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
                    card.classList.remove('modo-edicion');
                });
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Hábitat actualizado correctamente',
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar el hábitat. Intenta de nuevo.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
        }
    });

    // Función para confirmar y eliminar un hábitat
    async function confirmarYEliminarHabitat(habitat) {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            html: `Vas a eliminar el hábitat <b>"${habitat.nombre}"</b><br><br>Esta acción no se puede deshacer.`,
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        
        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/habitats/${habitat.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const respuestaHabitats = await fetch('http://localhost:8080/habitats');
                const dataActualizados = await respuestaHabitats.json();
                
                dataHabitats.length = 0;
                dataHabitats.push(...dataActualizados);
                
                mostrarHabitats(dataHabitats);
                
                modoEliminacionActivo = false;
                bannerEliminacion.classList.add("hidden");
                document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
                    card.classList.remove('modo-eliminacion');
                });
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'Hábitat eliminado correctamente',
                    timer: 3000,
                    showConfirmButton: false
                });
            } else {
                // Contar animales en el hábitat
                const animalesEnHabitat = dataAnimales.filter(a => a.habitat_id === habitat.id).length;
                const mensaje = animalesEnHabitat > 0 
                    ? `No se puede eliminar el hábitat porque hay ${animalesEnHabitat} ${animalesEnHabitat === 1 ? 'animal' : 'animales'} viviendo en él.`
                    : 'No se pudo eliminar el hábitat.';
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar',
                    text: mensaje
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.'
            });
        }
    }

    // Función que crea y muestra las tarjetas de hábitats
    function mostrarHabitats(habitatsParaMostrar) {
        habitatList.innerHTML = "";
        
        habitatsParaMostrar.forEach(habitat => {
            // Contar cuántos animales hay en este hábitat
            const numAnimales = dataAnimales.filter(a => a.habitat_id === habitat.id).length;
            
            const card = document.createElement("div");
            card.className = "tarjeta-giratoria";
            
            if (modoEdicionActivo) {
                card.classList.add('modo-edicion');
            }

            if (modoEliminacionActivo) {
                card.classList.add('modo-eliminacion');
            }

            card.addEventListener("click", () => {
                if (modoEdicionActivo) {
                    cargarDatosHabitatEditar(habitat);
                    formularioEditar.classList.remove("hidden");
                } else if (modoEliminacionActivo) {
                    confirmarYEliminarHabitat(habitat);
                }
            });

            card.innerHTML = `
                <div class="tarjeta-interna">
                    <div class="tarjeta-frente">
                        <div class="tarjeta-contenedor-imagen">
                            <img src="${habitat.imagen_url}" class="tarjeta-imagen">
                        </div>
                        <div class="tarjeta-contenido">
                            <div>
                                <div class="tarjeta-titulo">${habitat.nombre}</div>
                                <div class="tarjeta-subtitulo">🐾 ${numAnimales} ${numAnimales === 1 ? 'animal' : 'animales'}</div>
                            </div>
                            <span class="tarjeta-categoria">${habitat.clima}</span>
                        </div>
                    </div>
                    <div class="tarjeta-reverso">
                        <div class="tarjeta-reverso-cabecera">
                            <h3 class="tarjeta-reverso-titulo">${habitat.nombre}</h3>
                            <span class="tarjeta-categoria">${habitat.clima}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">🆔 ID</span>
                            <span class="tarjeta-detalle-valor">#${habitat.id}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">🌡️ Clima</span>
                            <span class="tarjeta-detalle-valor">${habitat.clima}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">📝 Descripción</span>
                            <span class="tarjeta-detalle-valor">${habitat.descripcion}</span>
                        </div>
                    </div>
                </div>
            `;
            habitatList.appendChild(card);
        });
    }
    
    // Mostrar spinner y luego los hábitats
    mostrarLoading();
    setTimeout(() => {
        mostrarHabitats(dataHabitats);
        ocultarLoading();
    }, 500);
});
