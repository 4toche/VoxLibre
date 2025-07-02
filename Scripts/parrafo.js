document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("main section");
  const btnParrafo = document.querySelectorAll(".btn-accion")[2];

  btnParrafo.addEventListener("click", () => {
    const contenedor = document.createElement("div");
    contenedor.className = "bloque-parrafo";
    contenedor.dataset.tipo = "parrafo"; // Necesario para preview.js

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Escribe el párrafo";
    textarea.rows = 4;

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar";
    btnAgregar.className = "btn-verde";
    btnAgregar.style.marginTop = "10px";

    const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-rojo";
        btnEliminar.style.marginLeft = "10px";
    
    btnEliminar.addEventListener("click", () => {
          section.removeChild(contenedor);
        });

    contenedor.appendChild(textarea);
    contenedor.appendChild(btnAgregar);
    contenedor.appendChild(btnEliminar);
    section.appendChild(contenedor);

    btnAgregar.addEventListener("click", () => {
      const texto = textarea.value.trim();
      if (texto !== "") {
        const parrafo = document.createElement("p");
        parrafo.textContent = texto;
        parrafo.className = "contenido"; // Importante para preview.js

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-rojo";
        btnEliminar.style.marginLeft = "10px";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-naranja";
        btnEditar.style.marginLeft = "10px";

        contenedor.innerHTML = "";
        contenedor.appendChild(parrafo);
        contenedor.appendChild(btnEliminar);
        contenedor.appendChild(btnEditar);

        btnEliminar.addEventListener("click", () => {
          section.removeChild(contenedor);
        });

        btnEditar.addEventListener("click", () => {
          textarea.value = parrafo.textContent;
          contenedor.innerHTML = "";
          contenedor.appendChild(textarea);
          contenedor.appendChild(btnAgregar);
        });
      }
    });
  });
});
