// Espera a que se cargue todo el HTML antes de ejecutar el código
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS de detalle de animal conectado correctamente!");

  // Elementos del DOM
  const logo = document.getElementById("logo");
  const btnVolver = document.getElementById("btnVolver");
  const btnIrHabitat = document.getElementById("btnIrHabitat");
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

  // Variable para guardar el habitat_id del animal
  let habitatIdActual = null;

  // Event listeners para navegación
  logo.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  btnVolver.addEventListener("click", () => {
    window.location.href = "./animales.html";
  });

  btnIrHabitat.addEventListener("click", () => {
      window.location.href = `./habitatDetalle.html?id=${habitatIdActual}`;
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

      // Guardar el habitat_id para el botón
      habitatIdActual = animal.habitat_id;

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

  // Función para mostrar los datos del animal en la página
  function mostrarDatosAnimal(animal, habitatNombre) {
    // Título de la página
    animalTitulo.textContent = animal.especie;

    // Imagen
    animalImagen.src = animal.imagen_url;
    animalImagen.alt = animal.especie;

    // Categoría
    animalCategoria.textContent = animal.categoria;

    // Nombre
    animalNombre.textContent = animal.nombre;

    // ID
    animalId.textContent = `#${animal.id}`;

    // Especie
    animalEspecie.textContent = animal.especie;

    // Edad
    animalEdad.textContent = `${animal.edad} ${animal.edad === 1 ? "año" : "años"}`;

    // Estado de salud con estilo
    const estadoSalud = animal.estado_salud;
    const esAtencion = estadoSalud.toLowerCase().includes("atención");
    animalEstado.textContent = estadoSalud;
    animalEstado.className = esAtencion
      ? "text-xl font-bold text-red-400"
      : "text-xl font-bold text-green-400";

    // Hábitat
    animalHabitat.textContent = habitatNombre;

    // Descripción
    animalDescripcion.textContent =
      animal.descripcion || "Sin descripción disponible";

    // Ocultar spinner y mostrar contenido
    loadingSpinner.classList.add("hidden");
    animalDetalle.classList.remove("hidden");
  }

  // Cargar el animal al iniciar la página
  await cargarAnimal();
});
