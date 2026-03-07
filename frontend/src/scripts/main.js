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

    // Función para mostrar animales en tarjetas
    if (bodyClass.includes("animales")) {
        const inicio = document.getElementById("logo")
        const animalList = document.getElementById("animalList");
        const searchInput = document.getElementById("searchAnimal");

        inicio.addEventListener("click", () => {
            window.location.href = "./index.html";
        });

        function mostrarAnimales(animalesParaMostrar) {
            animalList.innerHTML = "";
            animalesParaMostrar.forEach(animal => {
                const estadoSalud = animal.estado_salud;
                const esAtencion = estadoSalud.toLowerCase().includes('atención');
                const claseEstado = esAtencion ? 'estado-atencion' : 'estado-saludable';

                const card = document.createElement("div");
                card.className = "tarjeta-giratoria";

                card.addEventListener("click", () => {
                    window.location.href = 'animalDetalle.html?id=${animal.id}';
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
