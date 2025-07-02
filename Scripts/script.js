document.addEventListener("DOMContentLoaded", () => {
  // ---- TÍTULO ----
  const tituloInput = document.querySelector(".input-main.titulo");
  const btnAgregarTitulo = document.querySelector(".btn-agregar-titulo");
  const tituloContainer = document.querySelector(".titulo-generado");
  const tituloTexto = document.querySelector(".titulo-texto");
  const btnEditarTitulo = document.querySelector(".btn-editar-titulo");
  const btnEliminarTitulo = document.querySelector(".btn-eliminar-titulo");
  const tituloInputContainer = document.querySelector(".titulo-input");

  btnAgregarTitulo.addEventListener("click", () => {
    const texto = tituloInput.value.trim();
    if (texto !== "") {
      tituloTexto.textContent = texto;
      tituloTexto.classList.add("contenido");
      tituloContainer.setAttribute("data-tipo", "titulo");

      tituloInputContainer.style.display = "none";
      tituloContainer.style.display = "block";
    }
  });

  btnEditarTitulo.addEventListener("click", () => {
    tituloInput.value = tituloTexto.textContent;
    tituloContainer.style.display = "none";
    tituloInputContainer.style.display = "flex";
  });

  btnEliminarTitulo.addEventListener("click", () => {
    tituloTexto.textContent = "";
    tituloInput.value = "";
    tituloContainer.style.display = "none";
    tituloInputContainer.style.display = "flex";
  });

  // ---- AUTOR ----
  const autorInput = document.querySelector(".input-main.autor");
  const btnAgregarAutor = document.querySelector(".btn-agregar-autor");
  const autorContainer = document.querySelector(".autor-generado");
  const autorTexto = document.querySelector(".autor-texto");
  const btnEditarAutor = document.querySelector(".btn-editar-autor");
  const btnEliminarAutor = document.querySelector(".btn-eliminar-autor");
  const autorInputContainer = document.querySelector(".autor-input");

  btnAgregarAutor.addEventListener("click", () => {
    const texto = autorInput.value.trim();
    if (texto !== "") {
      autorTexto.textContent = "Por:   " + texto;
      autorTexto.classList.add("contenido");
      autorContainer.setAttribute("data-tipo", "autor");

      autorInputContainer.style.display = "none";
      autorContainer.style.display = "block";
    }
  });

  btnEditarAutor.addEventListener("click", () => {
    autorInput.value = autorTexto.textContent.replace("Por: ", "");
    autorContainer.style.display = "none";
    autorInputContainer.style.display = "flex";
  });

  btnEliminarAutor.addEventListener("click", () => {
    autorInput.value = "";
    autorTexto.textContent = "";
    autorContainer.style.display = "none";
    autorInputContainer.style.display = "flex";
  });
  document.getElementById("btnMantenimiento").addEventListener("click", () => {
  window.location.href = "Paginas/mantenimiento.html";
});
  document.getElementById("btnMantenimiento01").addEventListener("click", () => {
  window.location.href = "Paginas/mantenimiento.html";
});
});
