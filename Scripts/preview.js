// preview.js

document.addEventListener("DOMContentLoaded", () => {
  const btnPreview = document.getElementById("btn-preview");
  const main = document.querySelector("main");
  const aside = document.querySelector("aside");

  // Botones dinámicos
  const btnEditar = document.createElement("button");
  btnEditar.id = "btn-editar";
  btnEditar.textContent = "Volver a editar";
  btnEditar.className = "btn-naranja";
  btnEditar.style.display = "none";
  btnEditar.style.margin = "20px 10px 0 0";

  const btnPublicar = document.createElement("button");
  btnPublicar.id = "btn-publicar";
  btnPublicar.textContent = "Publicar";
  btnPublicar.className = "btn-verde";
  btnPublicar.style.display = "none";
  btnPublicar.style.margin = "20px 0";

  main.appendChild(btnEditar);
  main.appendChild(btnPublicar);

  // Modo Preview
  btnPreview.addEventListener("click", () => {
    main.querySelectorAll("input, textarea, button").forEach(el => {
      if (el !== btnEditar && el !== btnPublicar) el.style.display = "none";
    });
    aside.style.display = "none";
    btnEditar.style.display = "inline-block";
    btnPublicar.style.display = "inline-block";
  });

  // Volver a editar
  btnEditar.addEventListener("click", () => {
    main.querySelectorAll("input, textarea, button").forEach(el => {
      el.style.display = "inline-block";
    });
    aside.style.display = "block";
    btnEditar.style.display = "none";
    btnPublicar.style.display = "none";
  });

  // Publicar
  btnPublicar.addEventListener("click", async () => {
    btnPublicar.disabled = true;
    btnPublicar.textContent = "Publicando...";

    // Recoger todos los bloques que tengan data-tipo
    const bloques = [];
    const bloquesDom = main.querySelectorAll("[data-tipo]");

    bloquesDom.forEach(bloque => {
      const tipo = bloque.dataset.tipo;
      let contenido = "";

      if (tipo === "imagen") {
        const img = bloque.querySelector("img");
        if (img) contenido = img.src;
      } else if (tipo === "lista" || tipo === "lista_ordenada") {
        // Guardar innerHTML de los <li> para mantener la lista
        contenido = bloque.querySelector(tipo === "lista" ? "ul" : "ol")?.innerHTML.trim() || "";
      } else {
        // Autor, título, subtítulo, párrafo
        contenido = bloque.querySelector(".contenido")?.textContent.trim() || "";
      }

      if (contenido) {
        bloques.push({ tipo, contenido });
      }
    });

    if (bloques.length === 0) {
      alert("No hay contenido para publicar.");
      btnPublicar.disabled = false;
      btnPublicar.textContent = "Publicar";
      return;
    }

    // Nombre y contraseña temporales
    const temporal_nombre = prompt("Ingresa tu nombre para identificar la publicación:");
    const temporal_contraseña = prompt("Crea una contraseña para acceder luego:");

    if (!temporal_nombre || !temporal_contraseña) {
      alert("Nombre y contraseña son obligatorios para publicar.");
      btnPublicar.disabled = false;
      btnPublicar.textContent = "Publicar";
      return;
    }

    try {
      const response = await fetch("../Util/guardar_publicacion.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bloques, temporal_nombre, temporal_contraseña })
      });

      const result = await response.json();

      if (result.success) {
        alert("Publicación guardada con éxito.");
        window.location.href = `ver_publicacion.php?id=${result.id}`;
      } else {
        alert("Error al guardar: " + result.error);
        btnPublicar.disabled = false;
        btnPublicar.textContent = "Publicar";
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
      console.error(err);
      btnPublicar.disabled = false;
      btnPublicar.textContent = "Publicar";
    }
  });
});
