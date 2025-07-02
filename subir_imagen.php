<?php
header('Content-Type: application/json');

$carpetaDestino = 'uploads/'; // Asegúrate de que esta carpeta exista y tenga permisos

if (!is_dir($carpetaDestino)) {
    mkdir($carpetaDestino, 0777, true);
}

if (isset($_FILES['imagen'])) {
    $nombreArchivo = basename($_FILES['imagen']['name']);
    $rutaCompleta = $carpetaDestino . uniqid() . "_" . $nombreArchivo;

    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $rutaCompleta)) {
        echo json_encode([
            'success' => true,
            'url' => $rutaCompleta
        ]);
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
