document.addEventListener('DOMContentLoaded', async () => {

    console.log("¡JS conectado correctamente!");

    // Detecta que pagina es segun la clase del body para que no de error al intentar ejecutar funciones de una pagina en todas
    const bodyClass = document.body.className;

    //Traer datos de la API y psarlos a json
    const urlHabitats = 'http://localhost:8080/habitats';
    const resultHabitats = await fetch(urlHabitats)
    const dataHabitats = await resultHabitats.json();

    const urlAnimales = 'http://localhost:8080/animales';
    const resultAnimales = await fetch(urlAnimales)
    const dataAnimales = await resultAnimales.json();

    //Logica y uso de datos para el carrusel del la pagina index
    if (bodyClass.includes("index")) {

        const leftImg = document.getElementById("leftImage");
        const rightImg = document.getElementById("rightImage");

        let idCarrusel = 0;

        // Función para actualizar imágenes del carrusel
        function actualizarCarrusel() {
            if (dataAnimales.length > 0 && dataHabitats.length > 0) {
                const animalActual = dataAnimales[idCarrusel];
                const habitatDelAnimal = dataHabitats.find(h => h.id === animalActual.habitat_id);

                if (habitatDelAnimal) {
                    leftImg.src = habitatDelAnimal.imagen_url;
                }
                rightImg.src = animalActual.imagen_url;
            }
        }

        // Inicializar carrusel
        actualizarCarrusel();

        // Cambiar imágenes cada 3 segundos
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

        //Botones para cambiar de pagina desde la pagina index
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

    if (bodyClass.includes("animales")) {
        const inicio = document.getElementById("logo")
        const animalList = document.getElementById("animalList");
        const searchInput = document.getElementById("searchAnimal");
        const btnAñadir = document.getElementById("btnAñadir");
        const formularioAñadir = document.getElementById("formularioAñadir");
        const btnCerrarFormulario = document.getElementById("btnCerrarFormulario");
        const btnCancelar = document.getElementById("btnCancelar");
        const selectHabitat = document.getElementById("habitat_id");
        const formAñadirAnimal = document.getElementById("formAñadirAnimal");
        
        // Elementos para edición
        const btnEditar = document.getElementById("btnEditar");
        const formularioEditar = document.getElementById("formularioEditar");
        const btnCerrarFormularioEditar = document.getElementById("btnCerrarFormularioEditar");
        const btnCancelarEditar = document.getElementById("btnCancelarEditar");
        const formEditarAnimal = document.getElementById("formEditarAnimal");
        const selectHabitatEditar = document.getElementById("editar_habitat_id");
        const bannerEdicion = document.getElementById("bannerEdicion");
        const btnCancelarModoEdicion = document.getElementById("btnCancelarModoEdicion");
        
        // Variable para controlar modo edición
        let modoEdicionActivo = false;
        
        //Volver al menu principal clicando en el icono
        inicio.addEventListener("click", () => {
            window.location.href = "./index.html";
        });

        //Formulario crear animal:
        // Cargar hábitats dinámicamente en el select
        function cargarHabitats() {
            selectHabitat.innerHTML = '<option value="">Selecciona un hábitat</option>';
            dataHabitats.forEach(habitat => {
                const option = document.createElement("option");
                option.value = habitat.id;
                option.textContent = habitat.nombre;
                selectHabitat.appendChild(option);
            });
        }

        // Cargar hábitats en el formulario de edición
        function cargarHabitatsEditar() {
            selectHabitatEditar.innerHTML = '<option value="">Selecciona un hábitat</option>';
            dataHabitats.forEach(habitat => {
                const option = document.createElement("option");
                option.value = habitat.id;
                option.textContent = habitat.nombre;
                selectHabitatEditar.appendChild(option);
            });
        }

        // Cargar hábitats al iniciar
        cargarHabitats();
        cargarHabitatsEditar();

        // Mostrar formulario al hacer clic en Añadir
        btnAñadir.addEventListener("click", () => {
            formularioAñadir.classList.remove("hidden");
        });

        // Función para cerrar el formulario
        function cerrarFormulario() {
            formularioAñadir.classList.add("hidden");
        }

        // Cerrar formulario con el botón X
        btnCerrarFormulario.addEventListener("click", cerrarFormulario);

        // Cerrar formulario con el botón Cancelar
        btnCancelar.addEventListener("click", cerrarFormulario);

        // Añadir animal del formulario con POST
        formAñadirAnimal.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevenir recarga de la página

            // Recopilar datos del formulario
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
                // Enviar POST al backend
                const response = await fetch('http://localhost:8080/animales', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoAnimal)
                });

                if (response.ok) {
                    const animalCreado = await response.json();
                    
                    // Obtener el nombre del hábitat para el animal creado
                    const habitat = dataHabitats.find(h => h.id === animalCreado.habitat_id);
                    animalCreado.habitat_nombre = habitat ? habitat.nombre : 'No asignado';
                    
                    // Actualizar el array local
                    dataAnimales.push(animalCreado);
                    
                    // Actualizar la vista
                    mostrarAnimales(dataAnimales);
                    
                    // Cerrar formulario y limpiar
                    cerrarFormulario();
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

        // Activar modo edición
        btnEditar.addEventListener("click", () => {
            modoEdicionActivo = true;
            bannerEdicion.classList.remove("hidden");
            // Actualizar tarjetas con estilo de modo edición
            document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
                card.classList.add('modo-edicion');
            });
        });

        // Cancelar modo edición
        btnCancelarModoEdicion.addEventListener("click", () => {
            modoEdicionActivo = false;
            bannerEdicion.classList.add("hidden");
            document.querySelectorAll('.tarjeta-giratoria').forEach(card => {
                card.classList.remove('modo-edicion');
            });
        });

        // Función para cargar datos del animal en el formulario de edición
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

        // Función para cerrar el formulario de edición
        function cerrarFormularioEditar() {
            formularioEditar.classList.add("hidden");
        }

        // Cerrar formulario de edición con botón X
        btnCerrarFormularioEditar.addEventListener("click", cerrarFormularioEditar);

        // Cerrar formulario de edición con botón Cancelar
        btnCancelarEditar.addEventListener("click", cerrarFormularioEditar);

        // Función para mostrar animales en tarjetas:
        function mostrarAnimales(animalesParaMostrar) {
            animalList.innerHTML = "";
            animalesParaMostrar.forEach(animal => {
                const estadoSalud = animal.estado_salud;
                const esAtencion = estadoSalud.toLowerCase().includes('atención');
                const claseEstado = esAtencion ? 'estado-atencion' : 'estado-saludable';

                const card = document.createElement("div");
                card.className = "tarjeta-giratoria";
                
                // Si está en modo edición, añadir clase
                if (modoEdicionActivo) {
                    card.classList.add('modo-edicion');
                }

                card.addEventListener("click", () => {
                    // Si el modo edición está activo, cargar en formulario de edición
                    if (modoEdicionActivo) {
                        cargarDatosAnimalEditar(animal);
                        formularioEditar.classList.remove("hidden");
                    } else {
                        // Comportamiento normal: ir a detalle
                        window.location.href = 'animalDetalle.html?id=${animal.id}';
                    }
                });

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
        // Mostrar todos al cargar
        mostrarAnimales(dataAnimales);

        // Filtrar por especie mientras escribes
        searchInput.addEventListener("input", () => {
            const search = searchInput.value.toLowerCase();
            const filtrados = dataAnimales.filter(a => a.especie.toLowerCase().startsWith(search));
            mostrarAnimales(filtrados);
        });
    }
});
