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
    
    inicio.addEventListener("click", () => {
        window.location.href = "./index.html";
    });
});
