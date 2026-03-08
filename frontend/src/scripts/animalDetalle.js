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

  // Función para obtener el ID del animal desde la URL
  function obtenerIdDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  // Función para cargar los datos del animal
  async function cargarAnimal() {
    try {
      const animalIdParam = obtenerIdDesdeURL();

      // Si no hay ID en la URL, redirigir a la página de animales
      if (!animalIdParam) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se especificó un animal válido",
          confirmButtonColor: "#15803d",
        }).then(() => {
          window.location.href = "./animales.html";
        });
        return;
      }

      // Hacer fetch del animal específico
      const urlAnimal = `http://localhost:8080/animales/${animalIdParam}`;
      const responseAnimal = await fetch(urlAnimal);

      if (!responseAnimal.ok) {
        throw new Error("Animal no encontrado");
      }

      const animal = await responseAnimal.json();

      // Hacer fetch de los hábitats para obtener el nombre del hábitat
      const urlHabitats = "http://localhost:8080/habitats";
      const responseHabitats = await fetch(urlHabitats);
      const habitats = await responseHabitats.json();

      // Buscar el hábitat del animal
      const habitat = habitats.find((h) => h.id === animal.habitat_id);
      const habitatNombre = habitat ? habitat.nombre : "Sin hábitat asignado";

      // Mostrar los datos del animal
      mostrarDatosAnimal(animal, habitatNombre);
    } catch (error) {
      console.error("Error al cargar el animal:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar la información del animal",
        confirmButtonColor: "#15803d",
      }).then(() => {
        window.location.href = "./animales.html";
      });
    }
  }

  // Cargar el animal al iniciar la página
  await cargarAnimal();
});
