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

  // Elementos para el modo ELIMINAR
  const btnEliminar = document.getElementById("btnEliminar");
  const bannerEliminacion = document.getElementById("bannerEliminacion");
  const btnCancelarModoEliminacion = document.getElementById("btnCancelarModoEliminacion");

  let modoEliminacionActivo = false;

  // Activar modo eliminación
  btnEliminar.addEventListener("click", () => {
    modoEliminacionActivo = true;
    bannerEliminacion.classList.remove("hidden");
    document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
      card.classList.add("modo-eliminacion");
    });
  });

  // Cancelar modo eliminación
  btnCancelarModoEliminacion.addEventListener("click", () => {
    modoEliminacionActivo = false;
    bannerEliminacion.classList.add("hidden");
    document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
      card.classList.remove("modo-eliminacion");
    });
  });

  // Función para confirmar y eliminar animal
  async function confirmarYEliminarAnimal(animal) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar a ${animal.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:8080/animales/${animal.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "El animal ha sido eliminado correctamente",
            timer: 2000,
            showConfirmButton: false,
          });
          modoEliminacionActivo = false;
          bannerEliminacion.classList.add("hidden");
          document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
            card.classList.remove("modo-eliminacion");
          });
          // Recargar la página para actualizar los datos
          location.reload();
        } else {
          throw new Error("Error al eliminar");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al eliminar el animal",
        });
      }
    }
  }

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

    // Función que crea y muestra las tarjetas de animales
    function mostrarAnimales() {
      animalList.innerHTML = "";

      if (animalesDelHabitat.length === 0) {
        // Mostrar mensaje si no hay animales
        mensajeSinAnimales.classList.remove("hidden");
        return;
      }

      animalList.classList.remove("hidden");

      // Recorrer cada animal y crear una tarjeta para él
      animalesDelHabitat.forEach((animal) => {
        const estadoSalud = animal.estado_salud;
        const esAtencion = estadoSalud.toLowerCase().includes("atención");
        const claseEstado = esAtencion ? "estado-atencion" : "estado-saludable";

        const card = document.createElement("div");
        card.className = "tarjeta-giratoria";

        // Crear el HTML de la tarjeta con todos los datos del animal
        card.innerHTML = `
                <div class="tarjeta-interna">
                    <div class="tarjeta-frente">
                        <div class="tarjeta-contenedor-imagen">
                            <img src="${animal.imagen_url}" class="tarjeta-imagen" alt="${animal.nombre}">
                        </div>
                        <div class="tarjeta-contenido">
                            <div>
                                <div class="tarjeta-titulo">${animal.especie}</div>
                                <div class="tarjeta-subtitulo">🐾 ${animal.nombre}</div>
                            </div>
                            <span class="tarjeta-categoria">${animal.categoria}</span>
                        </div>
                    </div>
                    <div class="tarjeta-reverso">
                        <div class="tarjeta-reverso-cabecera">
                            <h3 class="tarjeta-reverso-titulo">${animal.especie}</h3>
                            <span class="tarjeta-categoria">${animal.categoria}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">🆔​ ID</span>
                            <span class="tarjeta-detalle-valor">#${animal.id}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">🐾 Nombre</span>
                            <span class="tarjeta-detalle-valor">${animal.nombre}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">🎂 Edad</span>
                            <span class="tarjeta-detalle-valor">${animal.edad} años</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">💚 Estado</span>
                            <span class="tarjeta-detalle-valor"><span class="tarjeta-estado ${claseEstado}">${animal.estado_salud}</span></span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">🌍 Hábitat</span>
                            <span class="tarjeta-detalle-valor">${habitat.nombre}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta">📝 Descripción</span>
                            <span class="tarjeta-detalle-valor">${animal.descripcion}</span>
                        </div>
                    </div>
                </div>
            `;
        animalList.appendChild(card);

        // Agregar listener para click en modo eliminación o navegación
        card.addEventListener("click", (e) => {
          if (modoEliminacionActivo) {
            e.preventDefault();
            e.stopPropagation();
            confirmarYEliminarAnimal(animal);
          } else {
            // Si no está en modo eliminación, navegar a detalle del animal
            window.location.href = `./animalDetalle.html?id=${animal.id}`;
          }
        });
      });
    }

    // Ejecutar las funciones para mostrar la información
    mostrarInfoHabitat();
    mostrarLoading();

    setTimeout(() => {
      mostrarAnimales();
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
