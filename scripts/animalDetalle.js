// esperar a que cargue antes de ejecutar
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS de detalle de animal conectado correctamente!");

  // referencias DOM
  const logo = document.getElementById("logo");
  const btnVolver = document.getElementById("btnVolver");
  const btnIrHabitat = document.getElementById("btnIrHabitat");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const animalDetalle = document.getElementById("animalDetalle");
  
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

  let habitatIdActual = null;

  // navegacion
  logo.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  btnVolver.addEventListener("click", () => {
    window.location.href = "./animales.html";
  });

  btnIrHabitat.addEventListener("click", () => {
    window.location.href = `./habitatDetalle.html?id=${habitatIdActual}`;
  });

  // obtener id desde la URL
  function obtenerIdDesdeURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  function cargarImagen(url, alt) {
    return new Promise((resolve) => {
      animalImagen.onload = () => resolve();
      animalImagen.onerror = () => resolve();
      animalImagen.alt = alt;
      animalImagen.src = url;
    });
  }

  // traer datos del animal desde la API
  async function cargarAnimal() {
    try {
      const animalIdParam = obtenerIdDesdeURL();

      if (!animalIdParam) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se especificó un animal válido",
          confirmButtonColor: "#15803d",
        }).then(() => {
          window.location.href = "animales.html";
        });
        return;
      }

      const urlAnimal = `${API_BASE_URL}/animales/${animalIdParam}`;
      const responseAnimal = await fetch(urlAnimal);

      if (!responseAnimal.ok) {
        throw new Error("Animal no encontrado");
      }

      const animal = await responseAnimal.json();

      // traer habitats para saber el nombre
      const urlHabitats = `${API_BASE_URL}/habitats`;
      const responseHabitats = await fetch(urlHabitats);
      const habitats = await responseHabitats.json();

      const habitat = habitats.find((h) => h.id === animal.habitat_id);
      const habitatNombre = habitat ? habitat.nombre : "Sin hábitat asignado";

      habitatIdActual = animal.habitat_id;

      await mostrarDatosAnimal(animal, habitatNombre);
    } catch (error) {
      console.error("Error al cargar el animal:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar la información del animal",
        confirmButtonColor: "#15803d",
      }).then(() => {
        window.location.href = "animales.html";
      });
    }
  }

  // poner los datos en la pagina
  async function mostrarDatosAnimal(animal, habitatNombre) {
    animalTitulo.textContent = animal.especie;
    await cargarImagen(animal.imagen_url, animal.especie);
    animalCategoria.textContent = animal.categoria;
    animalNombre.textContent = animal.nombre;
    animalId.textContent = `#${animal.id}`;
    animalEspecie.textContent = animal.especie;
    animalEdad.textContent = `${animal.edad} ${animal.edad === 1 ? "año" : "años"}`;

    // color segun estado
    const estadoSalud = animal.estado_salud;
    const esAtencion = estadoSalud.toLowerCase().includes("atención");
    animalEstado.textContent = estadoSalud;
    animalEstado.className = esAtencion
      ? "text-xl font-bold text-red-400"
      : "text-xl font-bold text-green-400";

    animalHabitat.textContent = habitatNombre;
    animalDescripcion.textContent =
      animal.descripcion || "Sin descripción disponible";

    // ocultar spinner y mostrar todo
    loadingSpinner.classList.add("hidden");
    animalDetalle.classList.remove("hidden");
  }

  await cargarAnimal();
});
