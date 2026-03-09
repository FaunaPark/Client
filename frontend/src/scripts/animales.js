// esperar a que cargue antes de ejecutar
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS de animales conectado correctamente!");

  // ===== TRAER DATOS DESDE LA API =====
  const urlHabitats = "http://localhost:8080/habitats";
  const resultHabitats = await fetch(urlHabitats);
  const dataHabitats = await resultHabitats.json();

  const urlAnimales = "http://localhost:8080/animales";
  const resultAnimales = await fetch(urlAnimales);
  const dataAnimales = await resultAnimales.json();

  // ===== REFERENCIAS DOM =====
  const inicio = document.getElementById("logo");
  const animalList = document.getElementById("animalList");
  const searchInput = document.getElementById("searchAnimal");
  const loadingSpinner = document.getElementById("loadingSpinner");

  // formulario añadir
  const btnAñadir = document.getElementById("btnAñadir");
  const formularioAñadir = document.getElementById("formularioAñadir");
  const btnCerrarFormulario = document.getElementById("btnCerrarFormulario");
  const btnCancelar = document.getElementById("btnCancelar");
  const selectHabitat = document.getElementById("habitat_id");
  const formAñadirAnimal = document.getElementById("formAñadirAnimal");

  // formulario editar
  const btnEditar = document.getElementById("btnEditar");
  const formularioEditar = document.getElementById("formularioEditar");
  const btnCerrarFormularioEditar = document.getElementById("btnCerrarFormularioEditar");
  const btnCancelarEditar = document.getElementById("btnCancelarEditar");
  const formEditarAnimal = document.getElementById("formEditarAnimal");
  const selectHabitatEditar = document.getElementById("editar_habitat_id");
  const bannerEdicion = document.getElementById("bannerEdicion");
  const btnCancelarModoEdicion = document.getElementById("btnCancelarModoEdicion");

  // modo eliminar
  const btnEliminar = document.getElementById("btnEliminar");
  const bannerEliminacion = document.getElementById("bannerEliminacion");
  const btnCancelarModoEliminacion = document.getElementById("btnCancelarModoEliminacion");

  let modoEdicionActivo = false;
  let modoEliminacionActivo = false;

  // ===== NAVEGACION =====
  inicio.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  // ===== SPINNER DE CARGA =====
  function mostrarLoading() {
    loadingSpinner.classList.remove("hidden");
    animalList.classList.add("hidden");
  }

  function ocultarLoading() {
    loadingSpinner.classList.add("hidden");
    animalList.classList.remove("hidden");
  }

  // ===== LLENAR DESPLEGABLES DE HABITATS =====
  function cargarHabitats() {
    selectHabitat.innerHTML = '<option value="">Selecciona un hábitat</option>';
    dataHabitats.forEach((habitat) => {
      const option = document.createElement("option");
      option.value = habitat.id;
      option.textContent = habitat.nombre;
      selectHabitat.appendChild(option);
    });
  }

  function cargarHabitatsEditar() {
    selectHabitatEditar.innerHTML = '<option value="">Selecciona un hábitat</option>';
    dataHabitats.forEach((habitat) => {
      const option = document.createElement("option");
      option.value = habitat.id;
      option.textContent = habitat.nombre;
      selectHabitatEditar.appendChild(option);
    });
  }

  cargarHabitats();
  cargarHabitatsEditar();

  // ===== FORMULARIO AÑADIR =====
  btnAñadir.addEventListener("click", () => {
    formularioAñadir.classList.remove("hidden");
  });

  function cerrarFormulario() {
    formularioAñadir.classList.add("hidden");
  }

  btnCerrarFormulario.addEventListener("click", cerrarFormulario);
  btnCancelar.addEventListener("click", cerrarFormulario);

  formAñadirAnimal.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoAnimal = {
      nombre: document.getElementById("nombre").value,
      especie: document.getElementById("especie").value,
      categoria: document.getElementById("categoria").value,
      edad: parseInt(document.getElementById("edad").value),
      estado_salud: document.getElementById("estado_salud").value,
      habitat_id: parseInt(document.getElementById("habitat_id").value),
      imagen_url: document.getElementById("imagen_url").value,
      descripcion: document.getElementById("descripcion").value,
    };

    try {
      const response = await fetch("http://localhost:8080/animales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAnimal),
      });

      if (response.ok) {
        const respuestaAnimales = await fetch("http://localhost:8080/animales");
        const dataActualizados = await respuestaAnimales.json();

        dataAnimales.length = 0;
        dataAnimales.push(...dataActualizados);

        mostrarAnimales(dataAnimales);
        cerrarFormulario();
        formAñadirAnimal.reset();

        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Animal añadido correctamente",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al añadir el animal. Intenta de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "Verifica que el servidor esté activo.",
      });
    }
  });

  // ===== MODO EDICION =====
  btnEditar.addEventListener("click", () => {
    modoEdicionActivo = true;
    bannerEdicion.classList.remove("hidden");
    document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
      card.classList.add("modo-edicion");
    });
  });

  btnCancelarModoEdicion.addEventListener("click", () => {
    modoEdicionActivo = false;
    bannerEdicion.classList.add("hidden");
    document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
      card.classList.remove("modo-edicion");
    });
  });

  // ===== MODO ELIMINACION =====
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

  // ===== CARGAR DATOS EN FORMULARIO EDITAR =====
  function cargarDatosAnimalEditar(animal) {
    document.getElementById("editar_id").value = animal.id;
    document.getElementById("editar_nombre").value = animal.nombre;
    document.getElementById("editar_especie").value = animal.especie;
    document.getElementById("editar_categoria").value = animal.categoria;
    document.getElementById("editar_edad").value = animal.edad;
    document.getElementById("editar_estado_salud").value = animal.estado_salud;
    document.getElementById("editar_habitat_id").value = animal.habitat_id;
    document.getElementById("editar_imagen_url").value = animal.imagen_url;
    document.getElementById("editar_descripcion").value = animal.descripcion;
  }

  function cerrarFormularioEditar() {
    formularioEditar.classList.add("hidden");
  }

  btnCerrarFormularioEditar.addEventListener("click", cerrarFormularioEditar);
  btnCancelarEditar.addEventListener("click", cerrarFormularioEditar);

  // ===== ENVIAR FORMULARIO EDITAR =====
  formEditarAnimal.addEventListener("submit", async (e) => {
    e.preventDefault();

    const animalId = document.getElementById("editar_id").value;

    const animalActualizado = {
      nombre: document.getElementById("editar_nombre").value,
      especie: document.getElementById("editar_especie").value,
      categoria: document.getElementById("editar_categoria").value,
      edad: parseInt(document.getElementById("editar_edad").value),
      estado_salud: document.getElementById("editar_estado_salud").value,
      habitat_id: parseInt(document.getElementById("editar_habitat_id").value),
      imagen_url: document.getElementById("editar_imagen_url").value,
      descripcion: document.getElementById("editar_descripcion").value,
    };

    try {
      const response = await fetch(`http://localhost:8080/animales/${animalId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animalActualizado),
      });

      if (response.ok) {
        const respuestaAnimales = await fetch("http://localhost:8080/animales");
        const dataActualizados = await respuestaAnimales.json();

        dataAnimales.length = 0;
        dataAnimales.push(...dataActualizados);

        mostrarAnimales(dataAnimales);
        cerrarFormularioEditar();

        modoEdicionActivo = false;
        bannerEdicion.classList.add("hidden");
        document.querySelectorAll(".tarjeta-giratoria").forEach((card) => {
          card.classList.remove("modo-edicion");
        });

        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Animal actualizado correctamente",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al actualizar el animal. Intenta de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    }
  });

  // ===== ELIMINAR ANIMAL =====
  async function confirmarYEliminarAnimal(animal) {
    const result = await Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      html: `Vas a eliminar a <b>"${animal.nombre}"</b> (${animal.especie})<br><br>Esta acción no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/animales/${animal.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const respuestaAnimales = await fetch("http://localhost:8080/animales");
        const dataActualizados = await respuestaAnimales.json();

        dataAnimales.length = 0;
        dataAnimales.push(...dataActualizados);

        mostrarAnimales(dataAnimales);

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
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el animal.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
      });
    }
  }

  // ===== CREAR Y MOSTRAR TARJETAS =====
  function mostrarAnimales(animalesParaMostrar) {
    animalList.innerHTML = "";

    animalesParaMostrar.forEach((animal) => {
      const estadoSalud = animal.estado_salud;
      const esAtencion = estadoSalud.toLowerCase().includes("atención");
      const claseEstado = esAtencion ? "estado-atencion" : "estado-saludable";

      const card = document.createElement("div");
      card.className = "tarjeta-giratoria";

      if (modoEdicionActivo) {
        card.classList.add("modo-edicion");
      }

      if (modoEliminacionActivo) {
        card.classList.add("modo-eliminacion");
      }

      // que hace cuando alguien le da click
      card.addEventListener("click", () => {
        if (modoEdicionActivo) {
          cargarDatosAnimalEditar(animal);
          formularioEditar.classList.remove("hidden");
        } else if (modoEliminacionActivo) {
          confirmarYEliminarAnimal(animal);
        } else {
          window.location.href = `animalDetalle.html?id=${animal.id}`;
        }
      });

      // html de la tarjeta
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
                            <span class="tarjeta-detalle-valor">${animal.habitat_nombre}</span>
                        </div>
                        <div class="tarjeta-detalle">
                            <span class="tarjeta-detalle-etiqueta"><i class="fa-solid fa-circle-info"></i> Descripción</span>
                            <span class="tarjeta-detalle-valor">${animal.descripcion}</span>
                        </div>
                    </div>
                </div>
            `;
      animalList.appendChild(card);
    });
  }

  // ===== CARGAR AL INICIO =====
  mostrarLoading();
  setTimeout(() => {
    mostrarAnimales(dataAnimales);
    ocultarLoading();
  }, 500);

  // ===== BUSCAR POR ESPECIE =====
  searchInput.addEventListener("input", () => {
    const search = searchInput.value.toLowerCase();
    const filtrados = dataAnimales.filter((a) =>
      a.especie.toLowerCase().startsWith(search),
    );
    mostrarAnimales(filtrados);
  });
});
