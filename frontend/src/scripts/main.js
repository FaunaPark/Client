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
});
