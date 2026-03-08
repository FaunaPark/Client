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

  try {
    // Obtener información del hábitat y sus animales en una sola llamada
    const urlHabitatAnimales = `http://localhost:8080/habitats/${habitatId}/animales`;
    const response = await fetch(urlHabitatAnimales);

    if (!response.ok) {
      throw new Error("Hábitat no encontrado");
    }

    const data = await response.json();

    // Extraer la información del hábitat y los animales
    const habitat = {
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      clima: data.clima,
      imagen_url: data.imagen_url
    };

    const animalesDelHabitat = data.animales || [];

    // Mostrar información del hábitat
    function mostrarInfoHabitat() {
      habitatImagen.src = habitat.imagen_url;
      habitatImagen.alt = habitat.nombre;
      habitatNombre.textContent = habitat.nombre;
      habitatClima.innerHTML = `<i class="fa-solid fa-cloud-sun"></i> ${habitat.clima}`;

      const numAnimales = animalesDelHabitat.length;
      habitatNumAnimales.innerHTML = `<i class="fa-solid fa-paw"></i> ${numAnimales} ${numAnimales === 1 ? "animal" : "animales"}`;

      habitatDescripcion.textContent = habitat.descripcion;
    }

    // Ejecutar las funciones para mostrar la información
    mostrarInfoHabitat();
    mostrarLoading();

    setTimeout(() => {
      ocultarLoading();
    }, 500);
  } catch (error) {
    console.error("Error:", error);
    // Si hay error, mostrar mensaje y redirigir
    Swal.fire({
      icon: "error",
      title: "Hábitat no encontrado",
      text: "El hábitat que buscas no existe o hubo un error al cargar los datos.",
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "./habitats.html";
    });
  }
});
