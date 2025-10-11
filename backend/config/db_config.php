<?php
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=university_grades_db;charset=utf8',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,//handel error when something goes wrong
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,//how to get results after fetching data
            PDO::ATTR_EMULATE_PREPARES => false//for security and inejction sql
        ]
    );
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
