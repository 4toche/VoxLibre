<?php
require 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);

$bloques = $data['bloques'] ?? [];
$temporal_nombre = trim($data['temporal_nombre'] ?? '');
$temporal_contraseña = trim($data['temporal_contraseña'] ?? '');

if (empty($bloques) || $temporal_nombre === '' || $temporal_contraseña === '') {
    echo json_encode(['success' => false, 'error' => 'Faltan datos requeridos.']);
    exit;
}

$titulo = '';
foreach ($bloques as $b) {
    if ($b['tipo'] === 'titulo') {
        $titulo = $b['contenido'];
        break;
    }
}

if ($titulo === '') {
    echo json_encode(['success' => false, 'error' => 'No se encontró el título.']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO publicaciones (titulo, temporal_nombre, temporal_contraseña) VALUES (?, ?, ?)");
    $stmt->execute([$titulo, $temporal_nombre, password_hash($temporal_contraseña, PASSWORD_DEFAULT)]);
    $publicacion_id = $pdo->lastInsertId();

    $orden = 1;
    $stmtBloque = $pdo->prepare("INSERT INTO bloques (publicacion_id, tipo, contenido, orden) VALUES (?, ?, ?, ?)");

    foreach ($bloques as $b) {
        $stmtBloque->execute([
            $publicacion_id,
            $b['tipo'],
            $b['contenido'],
            $orden++
        ]);
    }

    echo json_encode(['success' => true, 'id' => $publicacion_id]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
