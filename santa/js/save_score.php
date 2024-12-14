<?php
// Veritabanı bağlantı dosyasını dahil et
include 'config.php';

// Veriyi al
if (isset($_POST['username']) && isset($_POST['score'])) {
    $username = $_POST['username']; // Kullanıcı adı
    $score = $_POST['score']; // Skor

    // SQL sorgusu
    $sql = "INSERT INTO scores (username, score) VALUES ('$user', '$score')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Veritabanı bağlantısını kapatma
$conn = null;
?>
