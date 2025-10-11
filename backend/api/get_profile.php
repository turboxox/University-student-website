<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode([
        'success' => false, 
        'message' => 'Not logged in'
    ]);
    exit;
}

require_once '../config/db_config.php';

try {
    // Get student ID from session
    $student_id = $_SESSION['student_id'];
    
    // Fetch complete student information
    $stmt = $pdo->prepare("
        SELECT 
            student_id,
            prenom,
            nom,
            filiere,
            email,
            tel,
            semestre,
            cin,
            cne,
            ldn
        FROM users 
        WHERE student_id = ?
    ");
    
    $stmt->execute([$student_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo json_encode([
            'success' => true,
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'User not found in database'
        ]);
    }
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
    error_log('Profile fetch error: ' . $e->getMessage());
}
?>