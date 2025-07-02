<?php
// conexion.php
$host = 'localhost';
$dbname = 'sistema_noticias';
$user = 'root'; // cambia si usas otro usuario
$pass = '';     // cambia si tienes clave en tu servidor local

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión a la base de datos: " . $e->getMessage());
}
?>
