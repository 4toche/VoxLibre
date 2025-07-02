<?php
require 'Util/conexion.php';

$id = $_GET['id'] ?? null;
if (!$id) {
    die("ID de publicación no válido.");
}

// Cargar publicación
$stmt = $pdo->prepare("SELECT * FROM publicaciones WHERE id = ?");
$stmt->execute([$id]);
$publicacion = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$publicacion) {
    die("Publicación no encontrada.");
}

// Cargar bloques
$stmt = $pdo->prepare("SELECT * FROM bloques WHERE publicacion_id = ? ORDER BY orden");
$stmt->execute([$id]);
$bloques = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($publicacion['titulo']) ?></title>
  <link rel="stylesheet" href="Styles/styles_publicacion.css">
</head>
<body>
  <header>
    <h1>VoxLibre</h1>
  </header>
  <main>
    <section>
      <?php foreach ($bloques as $bloque): ?>
        <?php if ($bloque['tipo'] === 'autor'): ?>
          <p class="autor contenido"><?= htmlspecialchars($bloque['contenido']) ?></p>
        <?php elseif ($bloque['tipo'] === 'titulo'): ?>
          <h1 class="titulo-texto contenido"><?= htmlspecialchars($bloque['contenido']) ?></h1>
        <?php elseif ($bloque['tipo'] === 'subtitulo'): ?>
          <h2 class="contenido"><?= htmlspecialchars($bloque['contenido']) ?></h2>
        <?php elseif ($bloque['tipo'] === 'parrafo'): ?>
          <p><?= nl2br(htmlspecialchars($bloque['contenido'])) ?></p>
        <?php elseif ($bloque['tipo'] === 'imagen'): ?>
          <img src="<?= htmlspecialchars($bloque['contenido']) ?>" alt="" />
        <?php elseif ($bloque['tipo'] === 'lista'): ?>
          <ul class="contenido">
            <?= $bloque['contenido'] /* Se asume que contiene <li>... */ ?>
          </ul>
        <?php elseif ($bloque['tipo'] === 'lista_ordenada'): ?>
          <ol class="contenido">
            <?= $bloque['contenido'] ?>
          </ol>
        <?php endif; ?>
      <?php endforeach; ?>
    </section>
  </main>

  <footer>
    <p>&copy; <?= date("Y") ?> Publicación generada automáticamente</p>
  </footer>
</body>
</html>
