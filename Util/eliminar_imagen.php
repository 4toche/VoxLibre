<?php
header("Content-Type: application/json");

// Recibe los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['url'])) {
    echo json_encode(['success' => false, 'error' => 'URL no proporcionada']);
    exit;
}

// Extraer el nombre del archivo desde la URL
$url = $data['url'];
$filename = basename(parse_url($url, PHP_URL_PATH));
$ruta = __DIR__ . '/uploads/' . $filename; // Asegúrate de tener esta carpeta

// Verificar y eliminar el archivo
if (file_exists($ruta)) {
    if (unlink($ruta)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No se pudo eliminar el archivo']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Archivo no encontrado']);
}
?>
