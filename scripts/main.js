// esperar a que cargue antes de ejecutar
document.addEventListener("DOMContentLoaded", async () => {
  console.log("¡JS conectado correctamente!");

  // traer datos desde la API
  const urlHabitats = `${API_BASE_URL}/habitats`;
  const resultHabitats = await fetch(urlHabitats);
  const dataHabitats = await resultHabitats.json();

  const urlAnimales = `${API_BASE_URL}/animales`;
  const resultAnimales = await fetch(urlAnimales);
  const dataAnimales = await resultAnimales.json();

  // referencias DOM
  const leftImg = document.getElementById("leftImage");
  const rightImg = document.getElementById("rightImage");
  const btnHabitats = document.getElementById("btnHabitats");
  const btnAnimales = document.getElementById("btnAnimales");

  // controla el índice del carrusel
  let idCarrusel = 0;

  // actualiza las imagenes mostradas
  function actualizarCarrusel() {
    if (dataAnimales.length > 0 && dataHabitats.length > 0) {
      const animalActual = dataAnimales[idCarrusel];
      const habitatDelAnimal = dataHabitats.find(
        (h) => h.id === animalActual.habitat_id,
      );

      if (habitatDelAnimal) {
        leftImg.src = habitatDelAnimal.imagen_url;
      }
      rightImg.src = animalActual.imagen_url;
    }
  }

  // cargar primera imagen
  actualizarCarrusel();

  // cambio automatico cada 3 seg
  setInterval(() => {
    leftImg.classList.add("opacity-0");
    rightImg.classList.add("opacity-0");

    setTimeout(() => {
      idCarrusel++;
      if (idCarrusel >= dataAnimales.length) {
        idCarrusel = 0;
      }
      actualizarCarrusel();
      leftImg.classList.remove("opacity-0");
      rightImg.classList.remove("opacity-0");
    }, 500);
  }, 3000);

  // navegacion con botones
  btnHabitats.addEventListener("click", () => {
    window.location.href = "pages/habitats.html";
  });

  btnAnimales.addEventListener("click", () => {
    window.location.href = "pages/animales.html";
  });

  // navegacion con clicks en imagenes
  leftImg.addEventListener("click", () => {
    window.location.href = "pages/habitats.html";
  });

  rightImg.addEventListener("click", () => {
    window.location.href = "pages/animales.html";
  });
});
