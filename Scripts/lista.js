document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("main section");
  const botones = document.querySelectorAll(".btn-accion");

  const btnLista = botones[3];
  const btnListaOrdenada = botones[4];

  function crearLista(tipo) {
    const contenedor = document.createElement("div");
    contenedor.className = tipo === "ul" ? "bloque-lista" : "bloque-lista-ordenada";
    contenedor.dataset.tipo = tipo === "ul" ? "lista" : "lista_ordenada";

    const lista = document.createElement(tipo);
    lista.className = "contenido";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Agregar ítem";
    input.className = tipo === "ul" ? "lista-item" : "lista-ordenada-item";

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar";
    btnAgregar.className = "btn-verde";
    btnAgregar.style.marginTop = "10px";

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-rojo";
    btnEliminar.style.marginLeft = "10px";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn-naranja";
    btnEditar.style.marginLeft = "10px";

    contenedor.appendChild(lista);
    contenedor.appendChild(input);
    contenedor.appendChild(btnAgregar);
    contenedor.appendChild(btnEliminar);
    contenedor.appendChild(btnEditar);
    section.appendChild(contenedor);

    // Agregar ítem a la lista
    btnAgregar.addEventListener("click", () => {
      const texto = input.value.trim();
      if (texto === "") return;

      const li = document.createElement("li");
      li.textContent = texto;
      lista.appendChild(li);
      input.value = "";
    });

    // Eliminar toda la lista
    btnEliminar.addEventListener("click", () => {
      section.removeChild(contenedor);
    });

    // Editar/Guardar ítems individualmente
    btnEditar.addEventListener("click", () => {
      if (btnEditar.textContent === "Editar") {
        // Cambiar a modo edición
        const items = Array.from(lista.querySelectorAll("li"));
        lista.innerHTML = "";

        items.forEach(li => {
          const itemDiv = document.createElement("div");
          itemDiv.style.display = "flex";
          itemDiv.style.alignItems = "center";
          itemDiv.style.marginBottom = "5px";

          const inputItem = document.createElement("input");
          inputItem.type = "text";
          inputItem.value = li.textContent;
          inputItem.className = "input-lista-edit";
          inputItem.style.flex = "1";
          inputItem.style.padding = "6px 10px";
          inputItem.style.marginRight = "10px";
          inputItem.style.border = "1px solid #ccc";
          inputItem.style.borderRadius = "6px";

          const btnEliminarItem = document.createElement("button");
          btnEliminarItem.textContent = "X";
          btnEliminarItem.className = "btn-rojo";
          btnEliminarItem.style.marginLeft = "5px";

          btnEliminarItem.addEventListener("click", () => {
            itemDiv.remove();
          });

          itemDiv.appendChild(inputItem);
          itemDiv.appendChild(btnEliminarItem);
          lista.appendChild(itemDiv);
        });

        btnEditar.textContent = "Guardar";
        btnEditar.classList.remove("btn-naranja");
        btnEditar.classList.add("btn-verde");
      } else {
        // Guardar cambios
        const nuevosItems = [];
        lista.querySelectorAll("input").forEach(inputItem => {
          const texto = inputItem.value.trim();
          if (texto !== "") nuevosItems.push(texto);
        });

        lista.innerHTML = "";
        nuevosItems.forEach(texto => {
          const li = document.createElement("li");
          li.textContent = texto;
          lista.appendChild(li);
        });

        btnEditar.textContent = "Editar";
        btnEditar.classList.remove("btn-verde");
        btnEditar.classList.add("btn-naranja");
      }
    });
  }

  btnLista.addEventListener("click", () => crearLista("ul"));
  btnListaOrdenada.addEventListener("click", () => crearLista("ol"));
});
