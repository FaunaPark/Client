//Espera a que se cargue todo el HTML antes de ejecutar el código
document.addEventListener('DOMContentLoaded', async () => {

    console.log("¡JS conectado correctamente!");

    // Detecta en qué página estamos según la clase del body
    // Esto evita errores al intentar ejecutar código de una página en otra
    const bodyClass = document.body.className;

    //Traer datos de la API y psarlos a json
    const urlHabitats = 'http://localhost:8080/habitats';
    const resultHabitats = await fetch(urlHabitats)
    const dataHabitats = await resultHabitats.json();

    const urlAnimales = 'http://localhost:8080/animales';
    const resultAnimales = await fetch(urlAnimales)
    const dataAnimales = await resultAnimales.json();

    // CÓDIGO PARA LA PÁGINA INDEX (página principal)
    if (bodyClass.includes("index")) {

        // Obtener referencias a las imágenes del carrusel
        const leftImg = document.getElementById("leftImage");
        const rightImg = document.getElementById("rightImage");

        // Controla qué animal se está mostrando en el carrusel
        let idCarrusel = 0;

        // Función que actualiza las imágenes del carrusel
        // Muestra el hábitat del animal a la izquierda y el animal a la derecha
        function actualizarCarrusel() {
            if (dataAnimales.length > 0 && dataHabitats.length > 0) {
                const animalActual = dataAnimales[idCarrusel];
                // Buscar el hábitat al que pertenece este animal
                const habitatDelAnimal = dataHabitats.find(h => h.id === animalActual.habitat_id);

                if (habitatDelAnimal) {
                    leftImg.src = habitatDelAnimal.imagen_url;
                }
                rightImg.src = animalActual.imagen_url;
            }
        }

        // Mostrar la primera imagen al cargar la página
        actualizarCarrusel();

        // Cambiar imágenes automáticamente cada 3 segundos
        setInterval(() => {
            leftImg.classList.add("opacity-0");
            rightImg.classList.add("opacity-0");

            setTimeout(() => {
                idCarrusel++;
                if (idCarrusel >= dataAnimales.length) {
                    idCarrusel = 0;
                }
                actualizarCarrusel();
                leftImg.classList.remove("opacity-0");
                rightImg.classList.remove("opacity-0");
            }, 500);
        }, 3000);

        //Botones para cambiar de pagina
        document.getElementById("btnHabitats").addEventListener("click", () => {
            window.location.href = "./habitats.html";
        });

        document.getElementById("btnAnimales").addEventListener("click", () => {
            window.location.href = "./animales.html";
        });

        leftImg.addEventListener("click", () => {
            window.location.href = "./habitats.html";
        });

        rightImg.addEventListener("click", () => {
            window.location.href = "./animales.html";
        });
    }
    
    // CÓDIGO PARA LA PÁGINA DE ANIMALES
    if (bodyClass.includes("animales")) {
        const inicio = document.getElementById("logo")
        const animalList = document.getElementById("animalList");
        const searchInput = document.getElementById("searchAnimal");
        
        // Elementos del formulario para AÑADIR animal
        const btnAñadir = document.getElementById("btnAñadir");
        const formularioAñadir = document.getElementById("formularioAñadir");
        const btnCerrarFormulario = document.getElementById("btnCerrarFormulario");
        const btnCancelar = document.getElementById("btnCancelar");
        const selectHabitat = document.getElementById("habitat_id");
        const formAñadirAnimal = document.getElementById("formAñadirAnimal");
        
        // Elementos del formulario para EDITAR animal
        const btnEditar = document.getElementById("btnEditar");
        const formularioEditar = document.getElementById("formularioEditar");
        const btnCerrarFormularioEditar = document.getElementById("btnCerrarFormularioEditar");
        const btnCancelarEditar = document.getElementById("btnCancelarEditar");
        const formEditarAnimal = document.getElementById("formEditarAnimal");
        const selectHabitatEditar = document.getElementById("editar_habitat_id");
        const bannerEdicion = document.getElementById("bannerEdicion");
        const btnCancelarModoEdicion = document.getElementById("btnCancelarModoEdicion");
        
        let modoEdicionActivo = false;
        
        inicio.addEventListener("click", () => {
            window.location.href = "./index.html";
        });

        // CARGAR HÁBITATS EN LOS SELECT (desplegables)
        // Función que llena el select de hábitats en el formulario de AÑADIR
        function cargarHabitats() {
            selectHabitat.innerHTML = '<option value="">Selecciona un hábitat</option>';
            dataHabitats.forEach(habitat => {
                const option = document.createElement("option");
                option.value = habitat.id;
                option.textContent = habitat.nombre;
                selectHabitat.appendChild(option);
            });
        }

        // Función que llena el select de hábitats en el formulario de EDITAR
        function cargarHabitatsEditar() {
            selectHabitatEditar.innerHTML = '<option value="">Selecciona un hábitat</option>';
            dataHabitats.forEach(habitat => {
                const option = document.createElement("option");
                option.value = habitat.id;
                option.textContent = habitat.nombre;
                selectHabitatEditar.appendChild(option);
            });
        }

        // Ejecutar las funciones para cargar los hábitats al iniciar
        cargarHabitats();
        cargarHabitatsEditar();

        // Mostrar/ocultar formulario al hacer clic en Añadir
        btnAñadir.addEventListener("click", () => {
            formularioAñadir.classList.remove("hidden");
        });

        function cerrarFormulario() {
            formularioAñadir.classList.add("hidden");
        }

        btnCerrarFormulario.addEventListener("click", cerrarFormulario);

        btnCancelar.addEventListener("click", cerrarFormulario);

        // Añadir animal del formulario con POST
        formAñadirAnimal.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevenir recarga de la página

            // Recopilar todos los datos del formulario en un objeto
            const nuevoAnimal = {
                nombre: document.getElementById("nombre").value,
                especie: document.getElementById("especie").value,
                categoria: document.getElementById("categoria").value,
                edad: parseInt(document.getElementById("edad").value),
                estado_salud: document.getElementById("estado_salud").value,
                habitat_id: parseInt(document.getElementById("habitat_id").value),
                imagen_url: document.getElementById("imagen_url").value,
                descripcion: document.getElementById("descripcion").value
            };

            try {
                // Enviar petición POST al servidor para crear el animal
                const response = await fetch('http://localhost:8080/animales', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoAnimal)
                });

                if (response.ok) {
                    // Recargar todos los animales desde la API para tener datos actualizados
                    const respuestaAnimales = await fetch('http://localhost:8080/animales');
                    const dataActualizados = await respuestaAnimales.json();
                    
                    // Vaciar el array actual y llenarlo con los datos actualizados
                    dataAnimales.length = 0;
                    dataAnimales.push(...dataActualizados);
                    
                    // Actualizar la vista para mostrar el nuevo animal
                    mostrarAnimales(dataAnimales);
                    
                    cerrarFormulario();
                    // Limpiar todos los campos del formulario
                    formAñadirAnimal.reset();
                    
                    alert('¡Animal añadido correctamente!');
                } else {
                    alert('Error al añadir el animal. Intenta de nuevo.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión. Verifica que el servidor esté activo.');
            }
        });

        // Activar/desactivar modo edición
        btnEditar.addEventListener("click", () => {
            modoEdicionActivo = true;
            bannerEdicion.classList.remove("hidden");
            // Actualizar tarjetas con estilo de modo edición
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

        // Función que carga los datos de un animal en el formulario de edición
        function cargarDatosAnimalEditar(animal) {
            document.getElementById("editar_id").value = animal.id;
            document.getElementById("editar_nombre").value = animal.nombre;
            document.getElementById("editar_especie").value = animal.especie;
            document.getElementById("editar_categoria").value = animal.categoria;
            document.getElementById("editar_edad").value = animal.edad;
            document.getElementById("editar_estado_salud").value = animal.estado_salud;
            document.getElementById("editar_habitat_id").value = animal.habitat_id;
            document.getElementById("editar_imagen_url").value = animal.imagen_url;
            document.getElementById("editar_descripcion").value = animal.descripcion;
        }

        // Función para cerrar/ocultar el formulario de editar
        function cerrarFormularioEditar() {
            formularioEditar.classList.add("hidden");
        }

        btnCerrarFormularioEditar.addEventListener("click", cerrarFormularioEditar);

        btnCancelarEditar.addEventListener("click", cerrarFormularioEditar);


        formEditarAnimal.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevenir recarga de la página

            // Obtener el ID del animal a editar
            const animalId = document.getElementById("editar_id").value;

            // Recopilar todos los datos actualizados del formulario
            const animalActualizado = {
                nombre: document.getElementById("editar_nombre").value,
                especie: document.getElementById("editar_especie").value,
                categoria: document.getElementById("editar_categoria").value,
                edad: parseInt(document.getElementById("editar_edad").value),
                estado_salud: document.getElementById("editar_estado_salud").value,
                habitat_id: parseInt(document.getElementById("editar_habitat_id").value),
                imagen_url: document.getElementById("editar_imagen_url").value,
                descripcion: document.getElementById("editar_descripcion").value
            };

            try {
                const response = await fetch(`http://localhost:8080/animales/${animalId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(animalActualizado)
                });

                if (response.ok) {
                    const respuestaAnimales = await fetch('http://localhost:8080/animales');
                    const dataActualizados = await respuestaAnimales.json();
                    
                    // Vaciar el array actual y llenarlo con los datos actualizados
                    dataAnimales.length = 0;
                    dataAnimales.push(...dataActualizados);
                    
                    // Actualizar para mostrar los cambios
                    mostrarAnimales(dataAnimales);
                    
                    cerrarFormularioEditar();
                    
                    modoEdicionActivo = false;
                    bannerEdicion.classList.add("hidden");
                    
                    alert('¡Animal actualizado correctamente!');
                } else {
                    alert('Error al actualizar el animal. Intenta de nuevo.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error de conexión.');
            }
        });

        // Función que crea y muestra las tarjetas de animales
        function mostrarAnimales(animalesParaMostrar) {
            // Eliminar todas las tarjetas
            animalList.innerHTML = "";
            
            // Recorrer cada animal y crear una tarjeta para él
            animalesParaMostrar.forEach(animal => {
                const estadoSalud = animal.estado_salud;
                const esAtencion = estadoSalud.toLowerCase().includes('atención');
                const claseEstado = esAtencion ? 'estado-atencion' : 'estado-saludable';

                const card = document.createElement("div");
                card.className = "tarjeta-giratoria";
                
                // Si el modo edición está activo, añadir clase especial
                if (modoEdicionActivo) {
                    card.classList.add('modo-edicion');
                }

                // Definir qué pasa cuando se hace click en la tarjeta
                card.addEventListener("click", () => {
                    if (modoEdicionActivo) {
                        // Cargar los datos del animal en el formulario y abrirlo
                        cargarDatosAnimalEditar(animal);
                        formularioEditar.classList.remove("hidden");
                    } else {
                        // Si no ir a la página de detalle del animal
                        window.location.href = 'animalDetalle.html?id=${animal.id}';
                    }
                });

                // Crear el HTML de la tarjeta con todos los datos del animal
                card.innerHTML = `
                    <div class="tarjeta-interna">
                        <div class="tarjeta-frente">
                            <div class="tarjeta-contenedor-imagen">
                                <img src="${animal.imagen_url}" class="tarjeta-imagen">
                            </div>
                            <div class="tarjeta-contenido">
                                <div>
                                    <div class="tarjeta-titulo">${animal.especie}</div>
                                    <div class="tarjeta-subtitulo">🐾 ${animal.nombre}</div>
                                </div>
                                <span class="tarjeta-categoria">${animal.categoria}</span>
                            </div>
                        </div>
                        <div class="tarjeta-reverso">
                            <div class="tarjeta-reverso-cabecera">
                                <h3 class="tarjeta-reverso-titulo">${animal.especie}</h3>
                                <span class="tarjeta-categoria">${animal.categoria}</span>
                            </div>
                            <div class="tarjeta-detalle">
                                <span class="tarjeta-detalle-etiqueta">🆔​ ID</span>
                                <span class="tarjeta-detalle-valor">#${animal.id}</span>
                            </div>
                            <div class="tarjeta-detalle">
                                <span class="tarjeta-detalle-etiqueta">🐾 Nombre</span>
                                <span class="tarjeta-detalle-valor">${animal.nombre}</span>
                            </div>
                            <div class="tarjeta-detalle">
                                <span class="tarjeta-detalle-etiqueta">🎂 Edad</span>
                                <span class="tarjeta-detalle-valor">${animal.edad} años</span>
                            </div>
                            <div class="tarjeta-detalle">
                                <span class="tarjeta-detalle-etiqueta">💚 Estado</span>
                                <span class="tarjeta-detalle-valor"><span class="tarjeta-estado ${claseEstado}">${animal.estado_salud}</span></span>
                            </div>
                            <div class="tarjeta-detalle">
                                <span class="tarjeta-detalle-etiqueta">🌍 Hábitat</span>
                                <span class="tarjeta-detalle-valor">${animal.habitat_nombre}</span>
                            </div>
                            <div class="tarjeta-detalle">
                                <span class="tarjeta-detalle-etiqueta">📝 Descripción</span>
                                <span class="tarjeta-detalle-valor">${animal.descripcion}</span>
                            </div>
                        </div>
                    </div>
                `;
                animalList.appendChild(card);
            });
        }
        
        // Mostrar todos los animales al cargar la página
        mostrarAnimales(dataAnimales);

        // Filtrar por especie mientras escribes
        searchInput.addEventListener("input", () => {
            const search = searchInput.value.toLowerCase();
            const filtrados = dataAnimales.filter(a => a.especie.toLowerCase().startsWith(search));
            mostrarAnimales(filtrados);
        });
    }
});
