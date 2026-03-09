// esperar a que cargue antes de ejecutar
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS de detalle de hábitat conectado correctamente!");

  // sacar el id del habitat desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const habitatId = parseInt(urlParams.get("id"));

  // referencias DOM
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

  // elementos para modo eliminar
  const btnEliminar = document.getElementById("btnEliminar");
  const bannerEliminacion = document.getElementById("bannerEliminacion");
  const btnCancelarModoEliminacion = document.getElementById("btnCancelarModoEliminacion");

  let modoEliminacionActivo = false;

  // modo eliminacion
  btnEliminar.addEventListener("click", () => {
    modoEliminacionActivo = true;
    bannerEliminacion.classList.remove("hidden");
    document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
      card.classList.add("modo-eliminacion");
    });
  });

  btnCancelarModoEliminacion.addEventListener("click", () => {
    modoEliminacionActivo = false;
    bannerEliminacion.classList.add("hidden");
    document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
      card.classList.remove("modo-eliminacion");
    });
  });

  // confirmar antes de borrar
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
        const response = await fetch(`${API_BASE_URL}/animales/${animal.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          modoEliminacionActivo = false;
          bannerEliminacion.classList.add("hidden");
          document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
            card.classList.remove("modo-eliminacion");
          });
          
          Swal.fire({
            icon: "success",
            title: "¡Eliminado!",
            text: "Animal eliminado correctamente",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            location.reload();
          });
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

  // navegacion
  logo.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  btnVolverHabitats.addEventListener("click", () => {
    window.location.href = "./habitats.html";
  });

  // spinner
  function mostrarLoading() {
    loadingSpinner.classList.remove("hidden");
    animalList.classList.add("hidden");
    mensajeSinAnimales.classList.add("hidden");
  }

  function ocultarLoading() {
    loadingSpinner.classList.add("hidden");
  }

  try {
    // traer info del habitat y sus animales
    const urlHabitatAnimales = `${API_BASE_URL}/habitats/${habitatId}/animales`;
    const response = await fetch(urlHabitatAnimales);

    if (!response.ok) {
      throw new Error("Hábitat no encontrado");
    }

    const data = await response.json();

    const habitat = {
      id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      clima: data.clima,
      imagen_url: data.imagen_url
    };

    const animalesDelHabitat = data.animales || [];

    // mostrar el habitat arriba
    function mostrarInfoHabitat() {
      habitatImagen.src = habitat.imagen_url;
      habitatImagen.alt = habitat.nombre;
      habitatNombre.textContent = habitat.nombre;
      habitatClima.innerHTML = `<i class="fa-solid fa-cloud-sun"></i> ${habitat.clima}`;

      const numAnimales = animalesDelHabitat.length;
      habitatNumAnimales.innerHTML = `<i class="fa-solid fa-paw"></i> ${numAnimales} ${numAnimales === 1 ? "animal" : "animales"}`;

      habitatDescripcion.textContent = habitat.descripcion;
    }

    // crear tarjetas de animales
    function mostrarAnimales() {
      animalList.innerHTML = "";

      if (animalesDelHabitat.length === 0) {
        mensajeSinAnimales.classList.remove("hidden");
        return;
      }

      animalList.classList.remove("hidden");

      animalesDelHabitat.forEach((animal) => {
        const estadoSalud = animal.estado_salud;
        const esAtencion = estadoSalud.toLowerCase().includes("atención");
        const claseEstado = esAtencion ? "estado-atencion" : "estado-saludable";

        const card = document.createElement("div");
        card.className = "tarjeta-giratoria";

        card.innerHTML = `
                <div class="tarjeta-interna">
                    <div class="tarjeta-frente">
                        <div class="tarjeta-contenedor-imagen">
                            <img src="${animal.imagen_url}" class="tarjeta-imagen">
                        </div>
                        <div class="tarjeta-contenido">
                            <div>
                                <div class="tarjeta-titulo">${animal.especie}</div>
                                <div class="tarjeta-subtitulo">${animal.nombre}</div>
                            </div>
                            <span class="tarjeta-categoria">${animal.categoria}</span>
                        </div>
                    </div>
                    <div class="tarjeta-reverso">
                        <div class="tarjeta-reverso-cabecera">
                            <h3 class="tarjeta-reverso-titulo"><i class="fa-solid fa-paw mr-2"></i>${animal.especie}</h3>
                            <span class="tarjeta-categoria">${animal.categoria}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-hashtag mr-2"></i> ID</span>
                            <span class="tarjeta-detalle-valor">#${animal.id}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-address-card"></i> Nombre</span>
                            <span class="tarjeta-detalle-valor">${animal.nombre}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-cake-candles mr-2"></i> Edad</span>
                            <span class="tarjeta-detalle-valor">${animal.edad} años</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-heart-pulse mr-2"></i> Estado</span>
                            <span class="tarjeta-detalle-valor"><span class="tarjeta-estado ${claseEstado}">${animal.estado_salud}</span></span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-earth-americas mr-2"></i> Hábitat</span>
                            <span class="tarjeta-detalle-valor">${habitat.nombre}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-circle-info"></i> Descripción</span>
                            <span class="tarjeta-detalle-valor">${animal.descripcion}</span>
                        </div>
                    </div>
                </div>
            `;
        animalList.appendChild(card);

        // click en tarjeta
        card.addEventListener("click", (e) => {
          if (modoEliminacionActivo) {
            e.preventDefault();
            e.stopPropagation();
            confirmarYEliminarAnimal(animal);
          } else {
            window.location.href = `animalDetalle.html?id=${animal.id}`;
          }
        });
      });
    }

    // ejecutar todo
    mostrarInfoHabitat();
    mostrarLoading();

    setTimeout(() => {
      mostrarAnimales();
      ocultarLoading();
    }, 500);
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Hábitat no encontrado",
      text: "El hábitat que buscas no existe o hubo un error al cargar los datos.",
      timer: 3000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "habitats.html";
    });
  }
});
