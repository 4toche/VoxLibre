<?php
// Paginas/login_publicacion.php
$id = $_GET['id'] ?? null;
$redirect = $_GET['redirect'] ?? '';
if (!$id || !is_numeric($id)) {
    die("ID de publicación no válido.");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Acceder a tu noticia</title>
  <link rel="stylesheet" href="../Styles/login_publicacion.css">
</head>
<body>
  <div class="login-box">
    <h2>Acceder a tu noticia</h2>
    <?php if (isset($_GET['error'])): ?>
      <div class="error"><?= htmlspecialchars($_GET['error']) ?></div>
    <?php endif; ?>
    <input type="hidden" name="id" value="<?= htmlspecialchars($id) ?>">
      <input type="hidden" name="redirect" value="<?= htmlspecialchars($redirect) ?>">
    <form method="post" action="../Util/validar_login.php">
      

      <label for="usuario">Usuario</label>
      <input type="text" name="usuario" id="usuario" required>

      <label for="contrasena">Contraseña</label>
      <input type="password" name="contrasena" id="contrasena" required>
      
      <button type="submit">Ingresar</button>
    </form>
  </div>
</body>
</html>
