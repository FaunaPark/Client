document.addEventListener('DOMContentLoaded', async () => {

    console.log("¡JS conectado correctamente!");

    //Traer datos de la API y psarlos a json
    const urlHabitats = 'http://localhost:8080/habitats';
    const resultHabitats = await fetch(urlHabitats)
    const dataHabitats = await resultHabitats.json();

    const urlAnimales = 'http://localhost:8080/animales';
    const resultAnimales = await fetch(urlAnimales)
    const dataAnimales = await resultAnimales.json();

    //Logica y uso de datos para el carrusel del la pagina index
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

});
