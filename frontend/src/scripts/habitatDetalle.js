//Espera a que se cargue todo el HTML antes de ejecutar el código
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS de detalle de hábitat conectado correctamente!");

  // Obtener el ID del hábitat de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const habitatId = parseInt(urlParams.get("id"));

  // Elementos de la interfaz
  const logo = document.getElementById("logo");
  const btnVolverHabitats = document.getElementById("btnVolverHabitats");
  const habitatImagen = document.getElementById("habitatImagen");
  const habitatNombre = document.getElementById("habitatNombre");
  const habitatClima = document.getElementById("habitatClima");
  const habitatNumAnimales = document.getElementById("habitatNumAnimales");
  const habitatDescripcion = document.getElementById("habitatDescripcion");
  const animalList = document.getElementById("animalList");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const mensajeSinAnimales = document.getElementById("mensajeSinAnimales");

  // Botones de navegación
  logo.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  btnVolverHabitats.addEventListener("click", () => {
    window.location.href = "./habitats.html";
  });

  // Funciones para controlar el spinner de carga
  function mostrarLoading() {
    loadingSpinner.classList.remove("hidden");
    animalList.classList.add("hidden");
    mensajeSinAnimales.classList.add("hidden");
  }

  function ocultarLoading() {
    loadingSpinner.classList.add("hidden");
  }
});
