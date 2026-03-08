// Espera a que se cargue todo el HTML antes de ejecutar el código
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS de detalle de animal conectado correctamente!");

  // Elementos del DOM
  const logo = document.getElementById("logo");
  const btnVolver = document.getElementById("btnVolver");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const animalDetalle = document.getElementById("animalDetalle");

  // Elementos donde se mostrarán los datos del animal
  const animalTitulo = document.getElementById("animalTitulo");
  const animalImagen = document.getElementById("animalImagen");
  const animalCategoria = document.getElementById("animalCategoria");
  const animalNombre = document.getElementById("animalNombre");
  const animalId = document.getElementById("animalId");
  const animalEspecie = document.getElementById("animalEspecie");
  const animalEdad = document.getElementById("animalEdad");
  const animalEstado = document.getElementById("animalEstado");
  const animalHabitat = document.getElementById("animalHabitat");
  const animalDescripcion = document.getElementById("animalDescripcion");

  // Event listeners para navegación
  logo.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  btnVolver.addEventListener("click", () => {
    window.location.href = "./animales.html";
  });
});
