document.addEventListener('DOMContentLoaded', async () => {

    console.log("¡JS conectado correctamente!");

    const urlHabitats = 'http://localhost:8080/habitats';
    const resultHabitats = await fetch(urlHabitats)
    const dataHabitats = await resultHabitats.json();

    const urlAnimales = 'http://localhost:8080/animales';
    const resultAnimales = await fetch(urlAnimales)
    const dataAnimales = await resultAnimales.json();

    const leftImg = document.getElementById("leftImage");
    const rightImg = document.getElementById("rightImage");
   
    let carruselAnimales = [];
    carruselAnimales = dataAnimales;

    let carruselHabitats = [];
    carruselHabitats = dataHabitats;

    let idCarrusel = 0;

    if (carruselHabitats.length > 0 && carruselAnimales.length > 0) {
        leftImg.src = carruselHabitats[0].imagen_url;
        rightImg.src = carruselAnimales[0].imagen_url;

    }
    setInterval(() => {
        leftImg.classList.add("opacity-0");
        rightImg.classList.add("opacity-0");

            setTimeout(() => {

        idCarrusel++;

        if (idCarrusel >= carruselHabitats.length  || idCarrusel >= carruselAnimales.length) {
            idCarrusel = 0;
        }
        leftImg.src = carruselHabitats[idCarrusel].imagen_url;
                leftImg.classList.remove("opacity-0");
        rightImg.src = carruselAnimales[idCarrusel].imagen_url;
                rightImg.classList.remove("opacity-0");
    }, 500);
    }, 3000);

});
