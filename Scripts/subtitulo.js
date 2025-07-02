document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("main section");
  const btnSubtitulo = document.querySelector(".btn-accion");

  btnSubtitulo.addEventListener("click", () => {
    // Evitar múltiples inputs activos
    if (section.querySelector(".bloque-subtitulo input")) return;

    const contenedor = document.createElement("div");
    contenedor.className = "bloque-subtitulo";
    contenedor.dataset.tipo = "subtitulo"; // Importante para preview.js

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe el subtítulo";
    input.className = "input-subtitulo";

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar";
    btnAgregar.className = "btn-verde";

    const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-rojo";
        btnEliminar.style.marginLeft = "10px";
    
    btnEliminar.addEventListener("click", () => {
          section.removeChild(contenedor);
        });

    contenedor.appendChild(input);
    contenedor.appendChild(btnAgregar);
    contenedor.appendChild(btnEliminar);
    section.appendChild(contenedor);

    btnAgregar.addEventListener("click", () => {
      const texto = input.value.trim();
      if (texto === "") return;

      const h2 = document.createElement("h2");
      h2.textContent = texto;
      h2.className = "contenido"; // Necesario para preview.js

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "btn-rojo";
      btnEliminar.style.marginLeft = "10px";

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.className = "btn-naranja";
      btnEditar.style.marginLeft = "10px";

      contenedor.innerHTML = "";
      contenedor.appendChild(h2);
      contenedor.appendChild(btnEliminar);
      contenedor.appendChild(btnEditar);

      btnEliminar.addEventListener("click", () => {
        section.removeChild(contenedor);
      });

      btnEditar.addEventListener("click", () => {
        input.value = h2.textContent;
        contenedor.innerHTML = "";
        contenedor.appendChild(input);
        contenedor.appendChild(btnAgregar);
      });
    });
  });
});
