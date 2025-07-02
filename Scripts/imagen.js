document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("main section");
  const btnImagen = document.querySelectorAll(".btn-accion")[1];

  btnImagen.addEventListener("click", () => {
    const contenedor = document.createElement("div");
    contenedor.className = "bloque-imagen";
    contenedor.dataset.tipo = "imagen";

    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.className = "input-imagen";

    const btnSubir = document.createElement("button");
    btnSubir.textContent = "Subir imagen";
    btnSubir.className = "btn-verde";

    const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-rojo";
        btnEliminar.style.marginLeft = "10px";
    
    btnEliminar.addEventListener("click", () => {
          section.removeChild(contenedor);
        });

    contenedor.appendChild(inputFile);
    contenedor.appendChild(btnSubir);
    contenedor.appendChild(btnEliminar);
    section.appendChild(contenedor);

    btnSubir.addEventListener("click", () => {
      const file = inputFile.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("imagen", file);

      fetch("subir_imagen.php", {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const img = document.createElement("img");
            img.src = data.url;
            img.alt = "Imagen subida";
            img.style.width = "100%";
            img.style.maxWidth = "400px";
            img.style.display = "block";
            img.style.margin = "10px 0";
            contenedor.dataset.archivo = data.archivo;

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btn-rojo";

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.className = "btn-naranja";

            contenedor.innerHTML = "";
            contenedor.appendChild(img);
            contenedor.appendChild(btnEliminar);
            contenedor.appendChild(btnEditar);

            btnEliminar.addEventListener("click", () => {
              const nombreArchivo = contenedor.dataset.archivo;
              fetch("eliminar_imagen.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ archivo: nombreArchivo })
              });
              section.removeChild(contenedor);
            });

            btnEditar.addEventListener("click", () => {
              contenedor.innerHTML = "";
              contenedor.removeAttribute("archivo");
              contenedor.appendChild(inputFile);
              contenedor.appendChild(btnSubir);
            });
          } else {
            alert("Error al subir imagen");
          }
        })
        .catch(() => alert("Error al conectar con el servidor"));
    });
  });
});
