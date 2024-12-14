<?php

include('config.php');

// Veritabanına bağlan
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // En yüksek 3 skoru ve kullanıcı adını almak için sorgu
    $sql = "SELECT username, score FROM scores ORDER BY score DESC LIMIT 3";
    $stmt = $pdo->query($sql);

    // Sonuçları al
    $highScores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // JSON formatında döndür
    echo json_encode($highScores);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
